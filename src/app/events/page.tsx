import { getUpcomingEvents, getPastEvents } from "@/lib/connpass";
import { connpassConfig } from "@/lib/config";
import EventCard from "@/components/EventCard";
import SectionHeader from "@/components/SectionHeader";
import FallbackMessage from "@/components/FallbackMessage";
import type { Metadata } from "next";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "イベント",
  description:
    "XR Meetup Kagoshima の今後のイベントと過去の開催実績をご覧いただけます。",
};

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          イベント
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          connpass で募集中のイベントと、過去の開催実績
        </p>
      </div>

      {/* Upcoming */}
      <section className="mt-12">
        <SectionHeader title="今後のイベント" center />
        {upcoming.length > 0 ? (
          <div className="mx-auto max-w-2xl space-y-4">
            {upcoming.map((event) => (
              <EventCard key={event.event_id} event={event} />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center dark:border-gray-700 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              現在予定されているイベントはありません
            </p>
            <a
              href={connpassConfig.groupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              connpass でフォローして通知を受け取る →
            </a>
          </div>
        )}
      </section>

      {/* Past */}
      <section className="mt-16">
        <SectionHeader title="過去のイベント" center />
        {past.length > 0 ? (
          <div className="mx-auto max-w-2xl space-y-4">
            {past.map((event) => (
              <EventCard key={event.event_id} event={event} />
            ))}
          </div>
        ) : (
          <FallbackMessage />
        )}
      </section>
    </div>
  );
}
