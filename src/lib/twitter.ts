import { xConfig } from "./config";
import type { XPost } from "@/types";

type TwitterUserResponse = {
  data?: { id: string; name: string; username: string };
};

type TwitterTimelineResponse = {
  data?: {
    id: string;
    text: string;
    created_at?: string;
  }[];
};

/**
 * @xrm_kagoshima の最近の投稿を取得する
 * トークン未設定の場合は null を返す
 */
export async function getAccountPosts(): Promise<XPost[] | null> {
  if (!xConfig.bearerToken) {
    return null;
  }

  try {
    // 1. ユーザーID取得
    const userRes = await fetch(
      `https://api.twitter.com/2/users/by/username/${xConfig.username}`,
      {
        headers: { Authorization: `Bearer ${xConfig.bearerToken}` },
        next: { revalidate: 86400 }, // ユーザーIDは1日キャッシュ
      },
    );

    if (!userRes.ok) {
      console.error(`X API user lookup error: ${userRes.status}`);
      return null;
    }

    const userData: TwitterUserResponse = await userRes.json();
    if (!userData.data) return null;

    const userId = userData.data.id;
    const userName = userData.data.name;
    const userUsername = userData.data.username;

    // 2. 最近のツイート取得
    const tweetsRes = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=10&tweet.fields=created_at&exclude=retweets,replies`,
      {
        headers: { Authorization: `Bearer ${xConfig.bearerToken}` },
        next: { revalidate: 600 }, // 10分キャッシュ
      },
    );

    if (!tweetsRes.ok) {
      console.error(`X API timeline error: ${tweetsRes.status}`);
      return null;
    }

    const tweetsData: TwitterTimelineResponse = await tweetsRes.json();
    if (!tweetsData.data) return [];

    return tweetsData.data.map((tweet) => ({
      id: tweet.id,
      text: tweet.text,
      createdAt: tweet.created_at ?? "",
      authorName: userName,
      authorUsername: userUsername,
      url: `https://x.com/${userUsername}/status/${tweet.id}`,
    }));
  } catch (error) {
    console.error("Failed to fetch X account posts:", error);
    return null;
  }
}
