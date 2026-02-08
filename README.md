# XR Meetup Kagoshima（XRm鹿児島）ポータルサイト

鹿児島を拠点にXR（VR/AR/MR）技術の体験・学習・交流を行うコミュニティのポータルサイトです。

## 技術スタック

- **Next.js** (App Router) + **TypeScript** + **Tailwind CSS**
- Vercel デプロイ前提
- SSG / ISR（30分キャッシュ）で高速化
- SEO: OGP, JSON-LD (Organization), sitemap, robots

## ページ構成

| パス | 内容 |
|------|------|
| `/` | ホーム（次回イベント・最新レポート・ハッシュタグ投稿） |
| `/events` | イベント一覧（今後 / 過去 — connpass 由来） |
| `/reports` | レポート一覧（note 由来） |
| `/about` | ミッション・対象者・参加方法・行動指針 |
| `/contact` | お問い合わせフォーム（メール送信） |

## データ取得

| ソース | 方法 | キャッシュ |
|--------|------|-----------|
| connpass | REST API (`/api/v1/event/`) | ISR 30分 |
| note | RSS フィード | ISR 30分 |
| X (Twitter) | API v2 ハッシュタグ検索 | 10分（Route Handler） |

## 環境変数

`.env.local` に設定してください。

```bash
# === 推奨 ===

# connpass API v2 の API Key（未設定の場合はイベント取得スキップ）
CONNPASS_API_KEY=

# connpass グループの series_id（グループURL: https://xxx.connpass.com の管理画面で確認）
CONNPASS_SERIES_ID=

# X API v2 Bearer Token（未設定の場合はフォールバックUI表示）
X_BEARER_TOKEN=

# === 任意 ===

# サイトのベースURL（Vercel以外にデプロイする場合）
NEXT_PUBLIC_SITE_URL=https://xrm-kagoshima.vercel.app
```

### connpass API Key の取得方法

connpass API は 2025年に v2 へ移行し、API Key が必要になりました。

1. [connpass API v2 ドキュメント](https://connpass.com/about/api/v2/) を確認
2. connpass サポートに API Key を申請（個人・コミュニティ利用は無料）
3. 発行された API Key を環境変数 `CONNPASS_API_KEY` に設定

**注意**: API Key が未設定の場合、イベント取得をスキップしフォールバックUI（connpass リンク）を表示します。

### X API Bearer Token の取得方法

1. [X Developer Portal](https://developer.x.com/) でアプリを作成
2. Project > App > Keys and tokens から Bearer Token を取得
3. 環境変数 `X_BEARER_TOKEN` に設定

**注意**: Bearer Token が未設定の場合、ハッシュタグセクションは「X で見る」リンクにフォールバックします。サイト自体は正常に動作します。

## 設定のカスタマイズ

外部URLやコミュニティ情報は **`src/lib/config.ts`** に一元管理されています。

```typescript
// 例: connpass グループURLの変更
export const connpassConfig = {
  groupUrl: "https://your-group.connpass.com",
  // ...
};

// 例: note ユーザー名の変更
export const noteConfig = {
  username: "your_note_username",
  // ...
};
```

## ローカル開発

```bash
# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.local.example .env.local
# .env.local を編集

# 開発サーバー起動
npm run dev
```

http://localhost:3000 で確認できます。

## Vercel デプロイ

### 1. リポジトリの準備

```bash
cd portal-site
git init
git add .
git commit -m "feat: initial XRm鹿児島 portal site"
```

GitHub にリポジトリを作成してプッシュします。

### 2. Vercel でデプロイ

1. [Vercel](https://vercel.com) にログイン
2. 「Add New Project」でリポジトリをインポート
3. Framework Preset: **Next.js**（自動検出）
4. Environment Variables に以下を設定:
   - `CONNPASS_API_KEY`（推奨）
   - `CONNPASS_SERIES_ID`（推奨）
   - `X_BEARER_TOKEN`（任意）
   - `NEXT_PUBLIC_SITE_URL`（本番ドメインに合わせて変更）
5. 「Deploy」をクリック

### 3. カスタムドメイン（任意）

Vercel の Settings > Domains からカスタムドメインを設定可能です。
設定後、`NEXT_PUBLIC_SITE_URL` も合わせて更新してください。

## 運用

### コンテンツ更新

- **イベント**: connpass でイベントを作成すれば自動反映（ISR 30分）
- **レポート**: note に記事を投稿すれば自動反映（ISR 30分）
- **ハッシュタグ**: X に #XRm鹿児島 で投稿すれば自動反映（10分キャッシュ）

### 手動リフレッシュ

Vercel ダッシュボードから On-Demand ISR を利用するか、ページを再デプロイすることでキャッシュを即時更新できます。

## ディレクトリ構成

```
src/
├── app/
│   ├── layout.tsx          # 共通レイアウト + JSON-LD
│   ├── page.tsx            # ホーム
│   ├── sitemap.ts          # サイトマップ生成
│   ├── robots.ts           # robots.txt 生成
│   ├── events/page.tsx     # イベント一覧
│   ├── reports/page.tsx    # レポート一覧
│   ├── about/page.tsx      # About
│   ├── contact/page.tsx    # お問い合わせ
│   └── api/xrm-hashtag/    # X API Route Handler
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── EventCard.tsx
│   ├── PostCard.tsx
│   ├── SectionHeader.tsx
│   ├── CTAButton.tsx
│   ├── HashtagSection.tsx
│   └── FallbackMessage.tsx
├── lib/
│   ├── config.ts           # 設定ファイル（一元管理）
│   ├── connpass.ts          # connpass API 取得
│   ├── note.ts              # note RSS 取得
│   ├── twitter.ts           # X API v2 取得
│   └── utils.ts             # ユーティリティ
└── types/
    └── index.ts             # 型定義
```
