"use client"

import { useState } from "react"

type Message = {
  role: "user" | "bot"
  text: string
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi, I am the EzPG assistant. Ask me how to use this website."
    }
  ])

  async function handleSend() {
    const text = input.trim()
    if (!text || loading) return

    const userMessage: Message = { role: "user", text }
    setMessages(prev => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      })

      const data = await response.json()
      const botText =
        typeof data?.reply === "string" && data.reply.trim()
          ? data.reply
          : "I could not generate a response. Please try again."

      setMessages(prev => [...prev, { role: "bot", text: botText }])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: "bot",
          text: "Network error. Please try again."
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="w-[340px] max-w-[90vw] h-[420px] bg-white border border-gray-200 rounded-xl shadow-2xl flex flex-col overflow-hidden mb-3">
          <div className="bg-blue-600 text-white px-4 py-3 font-semibold">
            EzPG Assistant
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${
                  msg.role === "user"
                    ? "ml-auto bg-blue-600 text-white"
                    : "bg-white text-black border border-gray-200"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="bg-white text-black border border-gray-200 max-w-[85%] px-3 py-2 rounded-lg text-sm">
                Thinking...
              </div>
            )}
          </div>

          <div className="p-3 border-t border-gray-200 bg-white flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") handleSend()
              }}
              placeholder="Ask about this website..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-black placeholder:text-black outline-none"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-blue-600 text-white px-3 py-2 rounded-lg disabled:opacity-60"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(prev => !prev)}
        aria-label={open ? "Close chatbot" : "Open chatbot"}
        className="bg-blue-600 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7"
        >
          <path d="M12 2a1 1 0 0 1 1 1v1.07A7 7 0 0 1 19 11v4a3 3 0 0 1-3 3h-1.2l-2.95 2.46a1 1 0 0 1-1.28 0L7.62 18H6a3 3 0 0 1-3-3v-4a7 7 0 0 1 6-6.93V3a1 1 0 0 1 1-1h2Zm-4 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm8 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
        </svg>
      </button>
    </div>
  )
}
