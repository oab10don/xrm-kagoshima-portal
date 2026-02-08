import { connpassConfig } from "./config";
import type { ConnpassEvent } from "@/types";

type ConnpassApiResponse = {
  results_returned: number;
  events: ConnpassEvent[];
};

/**
 * connpass API v2 からイベント一覧を取得する
 * API Key が未設定の場合は空配列を返す
 */
async function fetchEvents(params: Record<string, string>): Promise<ConnpassEvent[]> {
  if (!connpassConfig.apiKey) {
    console.warn("CONNPASS_API_KEY is not set. Skipping connpass API call.");
    return [];
  }

  const url = new URL(connpassConfig.apiEndpoint);

  if (connpassConfig.seriesId) {
    url.searchParams.set("series_id", connpassConfig.seriesId);
  } else {
    url.searchParams.set("keyword", connpassConfig.keyword);
  }

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  url.searchParams.set("count", "20");
  url.searchParams.set("order", "2"); // 開催日時順

  const res = await fetch(url.toString(), {
    next: { revalidate: 1800 },
    headers: {
      "X-API-Key": connpassConfig.apiKey,
      "User-Agent": "XRm-Kagoshima-Portal/1.0 (Next.js)",
    },
  });

  if (!res.ok) {
    throw new Error(`connpass API error: ${res.status}`);
  }

  const data: ConnpassApiResponse = await res.json();
  return data.events;
}

/**
 * 今後のイベント一覧を取得（開催日が未来のもの）
 */
export async function getUpcomingEvents(): Promise<ConnpassEvent[]> {
  try {
    const now = new Date();
    const ym = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`;
    const events = await fetchEvents({ ym });

    return events
      .filter((e) => new Date(e.started_at) >= now)
      .sort(
        (a, b) =>
          new Date(a.started_at).getTime() - new Date(b.started_at).getTime(),
      );
  } catch (error) {
    console.error("Failed to fetch upcoming events:", error);
    return [];
  }
}

/**
 * 次回（直近未来）のイベントを1件取得
 */
export async function getNextEvent(): Promise<ConnpassEvent | null> {
  const events = await getUpcomingEvents();
  return events[0] ?? null;
}

/**
 * 過去のイベント一覧を取得
 */
export async function getPastEvents(): Promise<ConnpassEvent[]> {
  try {
    const events = await fetchEvents({ order: "3" }); // 更新日時順
    const now = new Date();

    return events
      .filter((e) => new Date(e.started_at) < now)
      .sort(
        (a, b) =>
          new Date(b.started_at).getTime() - new Date(a.started_at).getTime(),
      );
  } catch (error) {
    console.error("Failed to fetch past events:", error);
    return [];
  }
}
