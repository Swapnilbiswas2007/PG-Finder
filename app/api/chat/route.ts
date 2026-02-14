import { NextResponse } from "next/server"

function getFallbackReply(input: string): string {
  const q = input.trim().toLowerCase()

  if (!q) {
    return "Please type a question about EzPG, like search, login, register, or map usage."
  }

  if (q.includes("search") || q.includes("find") || q.includes("area")) {
    return "Use the homepage search bar. Click inside it to see demo results, then click a result to open Bangalore map view with that property selected."
  }

  if (q.includes("map") || q.includes("bangalore") || q.includes("city")) {
    return "On the Bangalore page, properties are listed on the left and the map is on the right. Click any property card to update the map location."
  }

  if (q.includes("login") || q.includes("sign in")) {
    return "Open /login from the top-right Login button. If you do not have an account yet, use the Register link on that page."
  }

  if (
    q.includes("register") ||
    q.includes("signup") ||
    q.includes("sign up") ||
    q.includes("account")
  ) {
    return "Open /register to create an account, then log in at /login using the same email and password."
  }

  return "I can answer questions about this website: homepage search, Bangalore listings/map, and login/register flow."
}

function extractTextFromOpenAIResponse(payload: any): string | null {
  if (typeof payload?.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text.trim()
  }

  const output = payload?.output
  if (!Array.isArray(output)) return null

  const parts: string[] = []
  for (const item of output) {
    if (!Array.isArray(item?.content)) continue

    for (const contentItem of item.content) {
      if (
        contentItem?.type === "output_text" &&
        typeof contentItem?.text === "string"
      ) {
        parts.push(contentItem.text)
      }
    }
  }

  const text = parts.join("\n").trim()
  return text || null
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({
        reply:
          "OPENAI_API_KEY is not set yet. Add it to .env.local, restart the dev server, then try again."
      })
    }

    const model = process.env.OPENAI_MODEL || "gpt-4.1-mini"

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        input: [
          {
            role: "system",
            content: [
              {
                type: "input_text",
                text: "You are EzPG assistant. Answer only questions related to this website: homepage search, Bangalore listing/map, login/register, and basic usage help. Keep answers concise."
              }
            ]
          },
          {
            role: "user",
            content: [{ type: "input_text", text: message }]
          }
        ],
        max_output_tokens: 220
      })
    })

    if (!response.ok) {
      const fallback = getFallbackReply(message)
      return NextResponse.json({ reply: fallback })
    }

    const payload = await response.json()
    const reply = extractTextFromOpenAIResponse(payload) || getFallbackReply(message)
    return NextResponse.json({ reply })
  } catch {
    return NextResponse.json(
      {
        reply:
          "I hit an error while answering. Please try again. You can still ask about search, map, login, and register."
      },
      { status: 200 }
    )
  }
}
