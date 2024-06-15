import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        jp: ['var(--font-mplus)'],
        en: ['var(--font-montserrat)'],
      },
      fontWeight: {
        normal: '300',
        enbold: '500',
        jpbold: '700',
      },
      fontSize: {
        '3xl': '22px', //タイトル英語
        '2xl': '20px', //タイトル
        lg: '18px', //サブタイトル
        sm: '14px', //デフォルとに想定*
        xs: '10px', //その他デフォルトより小さいフォント
      },
      colors: {
        background: '#f6f6f6',
        active: '#e4e4e4',
        hover: '#eaecf1',
        'hover-alert': '#f5ecec',
        'base-text': '#444', // ベースのフォントカラー
        border: '#a9a9a9',
        'border-op': '#a9a9a924',
        primary: '#0f83fd',
        'primary-dark': '#2177d2',
        success: '#13cd87',
        error: '#fd0f0f',
        warning: '#dcd209',
      },
    },
  },
  plugins: [],
}
export default config
