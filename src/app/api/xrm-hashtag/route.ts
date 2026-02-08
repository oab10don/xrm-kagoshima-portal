import { NextResponse } from "next/server";
import { getAccountPosts } from "@/lib/twitter";

export const revalidate = 600; // 10分キャッシュ

export async function GET() {
  const posts = await getAccountPosts();

  if (posts === null) {
    return NextResponse.json(
      { source: "fallback", posts: null },
      {
        headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300" },
      },
    );
  }

  return NextResponse.json(
    { source: "api", posts },
    {
      headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300" },
    },
  );
}
