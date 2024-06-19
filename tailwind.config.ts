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
        // base:{
        //   text: , // ベースのフォントカラー
        // },
        fc: {
          //font-color
          DEFAULT: '#444',
          placeholder: '#9b9b9b',
        },
        hover: {
          DEFAULT: '#eaecf1',
          alert: '#f5ecec',
        },
        border: {
          DEFAULT: '#a9a9a9',
          op: '#a9a9a924',
        },
        primary: {
          DEFAULT: '#0f83fd',
          dark: '#2177d2',
        },
        success: {
          DEFAULT: '#13cd87',
        },
        error: {
          DEFAULT: '#fd0f0f',
          dark: '#df1010',
        },
        warning: {
          DEFAULT: '#dcd209',
        },
      },
    },
  },
  plugins: [],
}
export default config
