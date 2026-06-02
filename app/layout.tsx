import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SENIM | Грантқа түсу калькуляторы",
  description: "ҰБТ балыңызды енгізіп, автоматты статистиканы көріңіз немесе 100% дәлдікпен VIP-талдау алыңыз. 2026 жылдың ресми мәліметтері.",
  openGraph: {
    title: "SENIM — Грантқа түсу калькуляторы",
    description: "ҰБТ балыңызды енгізіп, грантқа түсу мүмкіндігіңізді тексеріңіз. Толық сараптама және ЖОО тізімі.",
    url: "https://senim.kz", // Позже поменяем на ваш реальный домен
    siteName: "SENIM Grant Navigator",
    images: [
      {
        url: "/logo.png", // Подтянет ваш логотип из папки public
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