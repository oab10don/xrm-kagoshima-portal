import Image from "next/image";
import type { NotePost } from "@/types";
import { formatDate } from "@/lib/utils";

type Props = {
  post: NotePost;
};

export default function PostCard({ post }: Props) {
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
    >
      {post.thumbnail ? (
        <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={post.thumbnail}
            alt=""
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900">
          <svg className="h-10 w-10 text-green-300 dark:text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
      )}

      <div className="p-4">
        <time className="text-xs text-gray-400 dark:text-gray-500">
          {post.pubDate ? formatDate(post.pubDate) : ""}
        </time>
        <h3 className="mt-1.5 line-clamp-2 text-sm font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {post.title}
        </h3>
        {post.description && (
          <p className="mt-2 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
            {post.description}
          </p>
        )}
      </div>
    </a>
  );
}
