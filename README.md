## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## ディレクトリ構造

```
├── app // routing,サーバーサイドの処理が必要なもの
├── components
│   ├── elements　// Base~から始まるcomponentはリセット以外のstyleをつけない
│   ├── layouts　 // どのページでも使うlayoutに関わるcomponent
│   └── organism　//　複数のページで使われるcomponentのまとまり
├── features　// clientで使用する各ページ段位のcomponent、hooks
│   └── index
│       ├── components // このディレクトリメインで使用するcomponent
│       ├── hooks　// このディレクトリメインで使用するhooks
│       └── root　// 各ディレクトリごとのcomponent/hooks
│           ├── components
│           └── hooks
├── hooks
├── middleware.ts
├── providers
├── routers
├── styles
├── types
└── utils

```
