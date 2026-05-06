# GitHub Repository Search

GitHub の Search API を使ってリポジトリを検索・閲覧できる Next.js アプリです。

## 概要

- トップページの検索フォームでキーワードを入力すると、`/?q=<keyword>` に遷移して検索結果一覧を表示します。
- 一覧の各リポジトリをクリックすると `/repos/[owner]/[repo]` の詳細ページに遷移し、stars / subscribers / forks / open issues を表示します。
- データ取得はすべて Server Component 内で行い、外部 API キーは不要です（GitHub の public Search/Repos エンドポイントを使用）。

## 使用技術

| カテゴリ | 採用技術 |
|---|---|
| フレームワーク | [Next.js 16](https://nextjs.org)（App Router / Turbopack） |
| UI ライブラリ | React 19 |
| 言語 | TypeScript 5 |
| スタイリング | Tailwind CSS v4（`@tailwindcss/postcss`） |
| フォント | `next/font` の Geist / Geist Mono |
| テスト | Vitest 4 + @testing-library/react + jsdom + MSW |
| リンタ | ESLint 9（`eslint-config-next`） |
| アクセシビリティ検証 | axe-core（Playwright 経由で実行） |

## ディレクトリ構成

```
app/
├── layout.tsx                Root layout（Header + フォント）
├── page.tsx                  トップ + 検索結果（Server Component）
├── components/
│   ├── Header.tsx            サイトヘッダー
│   ├── SearchForm.tsx        検索フォーム（Client Component）
│   ├── RepoList.tsx          検索結果リスト
│   └── RepoDetail.tsx        詳細表示
└── repos/[owner]/[repo]/
    └── page.tsx              リポジトリ詳細（動的ルート）

lib/
└── github.ts                 GitHub API クライアント（searchRepositories / getRepository）

__tests__/                    Vitest テスト（RepoList / SearchForm / 詳細ページ）
```

## セットアップ

```bash
npm install
npm run dev          # http://localhost:3000
```

## スクリプト

| コマンド | 内容 |
|---|---|
| `npm run dev` | 開発サーバー起動（Turbopack） |
| `npm run build` | プロダクションビルド |
| `npm run start` | ビルド済みアプリの起動 |
| `npm run lint` | ESLint 実行 |
| `npm run test` | Vitest 実行 |
| `npm run test:ui` | Vitest UI 起動 |

## アクセシビリティ

WCAG 2.1 AA + best-practice ルールで axe-core を実行し、トップ・検索結果・詳細の3ページで違反 0 件を確認しています。具体的には次の対応を行いました。

- `RepoList` のメタ情報（言語名・スター数）を `text-gray-400` から `text-gray-600` に変更し、コントラスト比を 2.6:1 → 4.69:1 に改善。
- トップページに `sr-only` の `<h1>` を追加し、`page-has-heading-one` ルールを満たすように修正。

axe-core の検証は `playwright-cli run-code` でスクリプトを注入する方法で実施しており、依存パッケージの追加は不要です。

## API

- 検索: `GET https://api.github.com/search/repositories?q=<query>`
- 詳細: `GET https://api.github.com/repos/<owner>/<repo>`

未認証で利用しているため、GitHub の rate limit（IP あたり 60 req/hour）に注意してください。

## AIを使用して実装

機能ごとにブランチを切り、Claude Codeに壁打ちしながら作成しました。
READMEもClaudeに書いてもらっています。
コードレビューはGemini Code Assistで行い、レビュー内容を反映しながら進めました。
アクセシビリティ対応として、Playwright CLIを使ってチェックを行いました。

