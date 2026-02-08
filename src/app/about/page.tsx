import { siteConfig, connpassConfig, discordConfig } from "@/lib/config";
import CTAButton from "@/components/CTAButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: `${siteConfig.name} のミッション、対象者、参加方法についてご紹介します。`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          About
        </h1>
      </div>

      {/* Mission */}
      <section className="mt-12 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          ミッション
        </h2>
        <p className="mx-auto mt-3 max-w-xl leading-relaxed text-gray-600 dark:text-gray-400">
          XR Meetup Kagoshima（XRm鹿児島）は、鹿児島で XR（VR / AR /
          MR）技術に興味がある人が集まり、体験・学習・交流するコミュニティです。
          「まずは触ってみよう」をモットーに、初心者から開発者まで幅広い層が参加しやすい場を提供します。
        </p>
      </section>

      {/* Target */}
      <section className="mt-12">
        <h2 className="text-center text-xl font-bold text-gray-900 dark:text-white">
          こんな方におすすめ
        </h2>
        <ul className="mx-auto mt-4 max-w-md space-y-2 text-gray-600 dark:text-gray-400">
          <li className="flex gap-2">
            <span className="shrink-0 text-blue-500">-</span>
            VR / AR / MR を体験してみたい方
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-blue-500">-</span>
            XR アプリの開発に興味がある方
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-blue-500">-</span>
            XR を活用したビジネスや教育に関心がある方
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-blue-500">-</span>
            鹿児島のテックコミュニティでつながりたい方
          </li>
        </ul>
      </section>

      {/* How to Join */}
      <section className="mt-12">
        <h2 className="text-center text-xl font-bold text-gray-900 dark:text-white">
          参加方法
        </h2>
        <ol className="mx-auto mt-4 max-w-md space-y-3 text-gray-600 dark:text-gray-400">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-900 dark:text-blue-400">
              1
            </span>
            <span>
              <a
                href={connpassConfig.groupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 underline hover:text-blue-700"
              >
                connpass のグループページ
              </a>
              からメンバー登録
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-900 dark:text-blue-400">
              2
            </span>
            <span>開催されるイベントに参加申し込み</span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-900 dark:text-blue-400">
              3
            </span>
            <span>当日、会場にお越しください（持ち物はイベントページに記載）</span>
          </li>
        </ol>
      </section>

      {/* Code of Conduct */}
      <section className="mt-12">
        <h2 className="text-center text-xl font-bold text-gray-900 dark:text-white">
          行動指針
        </h2>
        <ul className="mx-auto mt-4 max-w-md space-y-2 text-gray-600 dark:text-gray-400">
          <li className="flex gap-2">
            <span className="shrink-0 text-blue-500">-</span>
            参加者全員が安心して楽しめる場を維持します
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-blue-500">-</span>
            相手を尊重し、建設的なコミュニケーションを心がけます
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-blue-500">-</span>
            ハラスメント行為は一切許容しません
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-blue-500">-</span>
            初心者の質問を歓迎します
          </li>
        </ul>
      </section>

      <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <CTAButton href={discordConfig.inviteUrl} external variant="discord">
          Join our Discord
        </CTAButton>
        <CTAButton href={connpassConfig.groupUrl} external variant="connpass">
          View events on connpass
        </CTAButton>
        <CTAButton href="/contact" variant="secondary">
          お問い合わせ
        </CTAButton>
      </div>
    </div>
  );
}
