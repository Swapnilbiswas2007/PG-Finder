"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleLogin() {
    const storedUser = localStorage.getItem("user")

    if (!storedUser) {
      alert("No account found. Please register.")
      return
    }

    const user = JSON.parse(storedUser)

    if (user.email === email && user.password === password) {
      localStorage.setItem("loggedIn", "true")
      alert("Login successful!")
      router.push("/city/bangalore")
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#0b2856] via-[#1c4ea1] to-[#23a1b6] px-4 py-10">
      <div className="hero-orb -left-20 top-10" />
      <div className="hero-orb right-0 bottom-10" />

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/40 bg-white/90 p-8 shadow-2xl backdrop-blur-md">
        <h1 className="display-font mb-2 text-3xl font-bold text-black">Welcome Back</h1>
        <p className="mb-6 text-sm text-black/70">Login to continue your PG search on EzPG.</p>

        <input
          placeholder="Email"
          className="mb-4 w-full rounded-xl border border-gray-300 p-3 text-black placeholder:text-black/60 outline-none focus:border-[#1c4ea1]"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-6 w-full rounded-xl border border-gray-300 p-3 text-black placeholder:text-black/60 outline-none focus:border-[#1c4ea1]"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full rounded-xl bg-[#0b2856] py-3 font-semibold text-white transition hover:bg-[#081b3b]"
        >
          Login
        </button>

        <p className="mt-4 text-center text-black">
          New user?{" "}
          <a href="/register" className="font-semibold text-[#1c4ea1] hover:underline">
            Register
          </a>
        </p>
      </div>
    </main>
  )
}
