/**
 * XRm鹿児島 ポータルサイト 設定ファイル
 * 外部URL・APIパラメータは全てここで管理する
 */

export const siteConfig = {
  name: "XR Meetup Kagoshima",
  shortName: "XRm鹿児島",
  description:
    "鹿児島を拠点にXR（VR/AR/MR）技術の体験・学習・交流を行うコミュニティです。",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://xrm-kagoshima.vercel.app",
  ogImage: "/og-image.png",
} as const;

export const discordConfig = {
  /** Discord 招待リンク */
  inviteUrl: process.env.NEXT_PUBLIC_DISCORD_INVITE_URL || "https://discord.gg/Yd45XCab7S",
} as const;

export const connpassConfig = {
  /** connpass グループの series_id（グループページURLの数字部分） */
  seriesId: process.env.CONNPASS_SERIES_ID || "",
  /** connpass グループ名（キーワード検索用フォールバック） */
  keyword: "XR Meetup Kagoshima",
  /** connpass グループページURL */
  groupUrl: "https://xrm-kagoshima.connpass.com",
  /** connpass API v2 エンドポイント */
  apiEndpoint: "https://connpass.com/api/v2/events/",
  /** connpass API Key（サーバーサイドのみ） */
  apiKey: process.env.CONNPASS_API_KEY || "",
} as const;

export const noteConfig = {
  /** note ユーザー名（@なし） */
  username: "xrm_kagoshima",
  /** note プロフィールURL */
  profileUrl: "https://note.com/xrm_kagoshima",
  /** RSS フィードURL */
  rssUrl: "https://note.com/xrm_kagoshima/rss",
} as const;

export const xConfig = {
  /** X アカウント名（@なし） */
  username: "xrm_kagoshima",
  /** X プロフィールURL */
  profileUrl: "https://x.com/xrm_kagoshima",
  /** Bearer Token（サーバーサイドのみ） */
  bearerToken: process.env.X_BEARER_TOKEN || "",
} as const;

export const contactConfig = {
  /** 問い合わせ先メールアドレス */
  email: "xrm.kagoshima@example.com",
  /** Google Form 等の外部フォームURL（使用する場合） */
  externalFormUrl: "",
} as const;

export const socialLinks = {
  discord: discordConfig.inviteUrl,
  connpass: connpassConfig.groupUrl,
  note: noteConfig.profileUrl,
  x: xConfig.profileUrl,
} as const;

/** 活動実績 */
export const achievements = [
  {
    title: "XR Kaigi AWARD 2025 アクティビティ部門 最優秀賞を受賞",
    description:
      "国内最大級のXRカンファレンスにて、地方から継続的にXRコミュニティ活動を行った実績が評価されました。",
    url: "https://prtimes.jp/main/html/rd/p/000000028.000137795.html",
    source: "PR TIMES",
  },
  {
    title: "高校教育におけるXR活用ライトニングトーク",
    description:
      "XR Kaigi 2024 にて、鹿児島の高校教育現場でのXR活用事例を発表しました。",
    url: "https://www.xrkaigi.com/event/9316/module/booth/308916/368397",
    source: "XR Kaigi 2024",
  },
  {
    title: "XR Meetup Kagoshima ブース出展（monoDuki合同会社）",
    description:
      "XR Kaigi 2024 にて「タツノオトシゴXR」などの鹿児島発XRコンテンツを展示しました。",
    url: "https://www.xrkaigi.com/event/9316/module/booth/261502/269133",
    source: "XR Kaigi 2024",
  },
] as const;

/** ISR revalidate 秒数 */
export const revalidateSeconds = 1800; // 30分
