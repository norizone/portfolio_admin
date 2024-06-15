import type { Metadata } from "next";
import { M_PLUS_1 ,Montserrat } from "next/font/google";
import "./globals.css";
import { BaseWrap } from "@/components/wrap/BaseWrap";

const mPlus = M_PLUS_1({ weight:['300','700'], subsets: ["latin"] ,display:"swap" ,variable: "--font-mplus",});
const montserrat = Montserrat({weight:['300','500'],subsets:["latin"] , display:"swap" ,variable:"--font-montserrat"})

export const metadata: Metadata = {
  title:{
    default: 'ポートフォリオ_管理画面',
    template: '%s | ポートフォリオ_管理画面',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${mPlus.variable} ${montserrat.variable} font-sm font-jp bg-background text-base-text font-normal min-w-[1200px] overflow-auto`}>
        <BaseWrap>
          {children}
        </BaseWrap>
        </body>
    </html>
  );
}
