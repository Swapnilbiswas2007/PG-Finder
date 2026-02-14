import "./globals.css"
import ChatbotWrapper from "./ChatbotWrapper"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="animate-fadeIn">
        {children}
        <ChatbotWrapper />
      </body>
    </html>
  )
}
