import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BabBuddy",
  description: "메뉴 추천 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
