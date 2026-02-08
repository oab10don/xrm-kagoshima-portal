import { noteConfig } from "./config";
import type { NotePost } from "@/types";

/**
 * note の RSS フィードを取得・パースする
 */
export async function getNotePosts(limit?: number): Promise<NotePost[]> {
  try {
    const res = await fetch(noteConfig.rssUrl, {
      next: { revalidate: 1800 },
      headers: { "User-Agent": "XRm-Kagoshima-Portal/1.0" },
    });

    if (!res.ok) {
      throw new Error(`note RSS fetch error: ${res.status}`);
    }

    const xml = await res.text();
    const posts = parseRss(xml);

    return limit ? posts.slice(0, limit) : posts;
  } catch (error) {
    console.error("Failed to fetch note posts:", error);
    return [];
  }
}

/**
 * RSS XML を NotePost[] にパースする
 * note は <media:thumbnail> でサムネイルを提供する
 */
function parseRss(xml: string): NotePost[] {
  const items: NotePost[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const content = match[1];
    items.push({
      title: extractTag(content, "title"),
      link: extractTag(content, "link"),
      description: stripHtml(extractTag(content, "description")),
      pubDate: extractTag(content, "pubDate"),
      creator: extractTag(content, "note:creatorName"),
      thumbnail: extractMediaThumbnail(content),
    });
  }

  return items;
}

/**
 * <media:thumbnail> タグから URL を抽出する
 * note RSS 形式: <media:thumbnail>URL</media:thumbnail>
 */
function extractMediaThumbnail(xml: string): string {
  // 属性に url がある場合: <media:thumbnail url="..."/>
  const attrMatch = /<media:thumbnail[^>]+url="([^"]*)"/.exec(xml);
  if (attrMatch) return attrMatch[1];

  // テキストノードの場合: <media:thumbnail>URL</media:thumbnail>
  const textMatch = /<media:thumbnail>([^<]+)<\/media:thumbnail>/.exec(xml);
  if (textMatch) return textMatch[1].trim();

  // <enclosure> フォールバック
  const encMatch = /url="([^"]*)"/.exec(
    (/<enclosure[^>]*>/.exec(xml) || [""])[0],
  );
  return encMatch ? encMatch[1] : "";
}

function extractTag(xml: string, tag: string): string {
  // CDATA対応
  const cdataRegex = new RegExp(
    `<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`,
  );
  const cdataMatch = cdataRegex.exec(xml);
  if (cdataMatch) return cdataMatch[1].trim();

  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`);
  const match = regex.exec(xml);
  return match ? match[1].trim() : "";
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .trim();
}
