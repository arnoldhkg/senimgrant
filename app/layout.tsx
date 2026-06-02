import type { Metadata } from "next";
// ВОТ ЭТА СТРОЧКА ВКЛЮЧИТ ВСЕ СТИЛИ НА СЕРВЕРЕ:
import "./globals.css";

export const metadata: Metadata = {
  title: "SENIM | Грантқа түсу калькуляторы",
  description: "ҰБТ балыңызды енгізіп, автоматты статистиканы көріңіз немесе 100% дәлдікпен VIP-талдау алыңыз. 2026 жылдың ресми мәліметтері.",
  openGraph: {
    title: "SENIM — Грантқа түсу калькуляторы",
    description: "ҰБТ балыңызды енгізіп, грантқа түсу мүмкіндігіңізді тексеріңіз. Толық сараптама және ЖОО тізімі.",
    url: "https://senim.kz", 
    siteName: "SENIM Grant Navigator",
    images: [
      {
        url: "/logo.png", 
        width: 800,
        height: 600,
        alt: "SENIM Logo",
      },
    ],
    locale: "kk_KZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="kk">
      <body>{children}</body>
    </html>
  )
}