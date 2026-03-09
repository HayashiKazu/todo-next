# TODOリストアプリ

Next.js で作成したシンプルなTODOリストアプリです。

## デモ

https://todo-next-woad-ten.vercel.app

## 機能

- タスクの追加（入力後に「追加」ボタンまたはEnterキー）
- タスクの完了/未完了の切り替え（チェックボックス）
- タスクの個別削除
- 完了済みタスクの一括削除
- 残りタスク数・完了数の表示

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | [Next.js](https://nextjs.org) 16 (App Router) |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS |
| テスト | Vitest / Testing Library |
| デプロイ | Vercel |

## セットアップ

```bash
# リポジトリのクローン
git clone https://github.com/HayashiKazu/todo-next.git
cd todo-next

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## コマンド

```bash
npm run dev        # 開発サーバーの起動
npm run build      # 本番ビルド
npm run start      # 本番サーバーの起動
npm run lint       # コードのリント
npm test           # テストの実行（1回）
npm run test:watch # テストのウォッチモード
```

## ディレクトリ構成

```
todo-next/
├── app/
│   ├── page.tsx        # TODOリストのメインコンポーネント
│   ├── page.test.tsx   # テストコード
│   ├── layout.tsx      # レイアウト
│   └── globals.css     # グローバルスタイル
├── vitest.config.ts    # Vitest設定
└── vitest.setup.ts     # テストセットアップ
```
