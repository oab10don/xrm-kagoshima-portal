import type { ConnpassEvent } from "@/types";
import { formatDateTime } from "@/lib/utils";

type Props = {
  event: ConnpassEvent;
  variant?: "default" | "featured";
};

export default function EventCard({ event, variant = "default" }: Props) {
  const isFeatured = variant === "featured";

  return (
    <a
      href={event.event_url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block rounded-xl border transition-shadow hover:shadow-md ${
        isFeatured
          ? "border-blue-200 bg-blue-50/50 p-6 dark:border-blue-900 dark:bg-blue-950/30"
          : "border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
      }`}
    >
      {isFeatured && (
        <span className="mb-3 inline-block rounded-full bg-blue-600 px-3 py-0.5 text-xs font-semibold text-white">
          次回イベント
        </span>
      )}

      <h3
        className={`font-bold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 ${
          isFeatured ? "text-xl" : "text-base"
        }`}
      >
        {event.title}
      </h3>

      {event.catch && (
        <p className="mt-2 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
          {event.catch}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1.5">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          {formatDateTime(event.started_at)}
        </span>

        {event.place && (
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {event.place}
          </span>
        )}

        <span className="flex items-center gap-1.5">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
          {event.accepted}人参加
          {event.waiting > 0 && ` / ${event.waiting}人待ち`}
        </span>
      </div>

      {isFeatured && (
        <div className="mt-5">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-blue-700">
            参加する
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </div>
      )}
    </a>
  );
}
