import { getNotePosts } from "@/lib/note";
import { noteConfig } from "@/lib/config";
import PostCard from "@/components/PostCard";
import FallbackMessage from "@/components/FallbackMessage";
import type { Metadata } from "next";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "レポート",
  description:
    "XR Meetup Kagoshima のイベントレポートやお知らせ記事の一覧です。",
};

export default async function ReportsPage() {
  const posts = await getNotePosts();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          レポート
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          note に投稿されたイベントレポート・お知らせ
        </p>
        <a
          href={noteConfig.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          note でフォローする →
        </a>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.link} post={post} />
          ))}
        </div>
      ) : (
        <FallbackMessage />
      )}
    </div>
  );
}
