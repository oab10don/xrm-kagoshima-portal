"use client";

import { useEffect, useState } from "react";
import { xConfig } from "@/lib/config";
import { timeAgo } from "@/lib/utils";
import type { XPost } from "@/types";

export default function HashtagSection() {
  const [posts, setPosts] = useState<XPost[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiAvailable, setApiAvailable] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/xrm-hashtag");
        const data = await res.json();

        if (data.source === "api" && data.posts) {
          setPosts(data.posts);
          setApiAvailable(true);
        } else {
          setApiAvailable(false);
        }
      } catch {
        setApiAvailable(false);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <section className="mx-auto max-w-5xl px-4 py-14">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          @{xConfig.username} の投稿
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          X での最新情報をチェック
        </p>
      </div>

      {loading ? (
        <div className="mx-auto max-w-2xl space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800"
            />
          ))}
        </div>
      ) : apiAvailable && posts && posts.length > 0 ? (
        /* A: API 経由のポスト表示 */
        <div className="mx-auto max-w-2xl space-y-3">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="mb-2 flex items-center gap-2 text-sm">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {post.authorName}
                </span>
                <span className="text-gray-400">@{post.authorUsername}</span>
                <span className="text-gray-300 dark:text-gray-600">·</span>
                <time className="text-gray-400">{timeAgo(post.createdAt)}</time>
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {post.text}
              </p>
            </a>
          ))}
        </div>
      ) : (
        /* B: フォールバック — プロフィールリンク */
        <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900">
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            @{xConfig.username} の最新投稿を X でチェックできます
          </p>
          <a
            href={xConfig.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            @{xConfig.username} を見る
          </a>
        </div>
      )}
    </section>
  );
}
