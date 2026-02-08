import { getNextEvent } from "@/lib/connpass";
import { getNotePosts } from "@/lib/note";
import { siteConfig, connpassConfig, discordConfig, achievements } from "@/lib/config";
import EventCard from "@/components/EventCard";
import PostCard from "@/components/PostCard";
import SectionHeader from "@/components/SectionHeader";
import CTAButton from "@/components/CTAButton";
import FallbackMessage from "@/components/FallbackMessage";
import HashtagSection from "@/components/HashtagSection";

export const revalidate = 1800;

export default async function Home() {
  const [nextEvent, latestPosts] = await Promise.all([
    getNextEvent(),
    getNotePosts(3),
  ]);

  return (
    <div>
      {/* Hero / First View */}
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:py-28">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            {siteConfig.name}
          </h1>
          <div className="mx-auto mt-6 max-w-xl space-y-1 text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-400">
            <p>XR人材による未来づくり</p>
            <p>領域を超えた取り組み「XR×○○」で課題解決</p>
            <p>鹿児島拠点で事例を生み出していく</p>
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CTAButton href={discordConfig.inviteUrl} external variant="discord">
              Discord に参加する
            </CTAButton>
            <CTAButton href={connpassConfig.groupUrl} external variant="connpass">
              connpass でイベントをチェック
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Next Event */}
      <section className="mx-auto max-w-5xl px-4 py-14">
        <SectionHeader
          title="次回イベント"
          linkHref="/events"
          linkLabel="イベント一覧"
          center
        />
        <div className="mx-auto max-w-2xl">
          {nextEvent ? (
            <EventCard event={nextEvent} variant="featured" />
          ) : (
            <FallbackMessage message="現在予定されているイベントはありません。connpass をチェックしてください。" />
          )}
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-gray-50 dark:bg-gray-950">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <SectionHeader title="活動実績" center />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
              >
                <span className="mb-2 inline-block rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                  {item.source}
                </span>
                <h3 className="mt-2 text-sm font-bold leading-snug text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Reports */}
      <section>
        <div className="mx-auto max-w-5xl px-4 py-14">
          <SectionHeader
            title="最新レポート"
            description="note に投稿されたイベントレポート・お知らせ"
            linkHref="/reports"
            linkLabel="すべて見る"
            center
          />
          {latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <PostCard key={post.link} post={post} />
              ))}
            </div>
          ) : (
            <FallbackMessage />
          )}
        </div>
      </section>

      {/* X Account Posts */}
      <section className="bg-gray-50 dark:bg-gray-950">
        <HashtagSection />
      </section>
    </div>
  );
}
