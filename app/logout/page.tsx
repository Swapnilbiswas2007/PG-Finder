"use client"

import { useRouter } from "next/navigation"

export default function LogoutPage() {
  const router = useRouter()

  function handleLogout() {
    localStorage.removeItem("loggedIn")
    router.push("/login")
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#0b2856] via-[#1c4ea1] to-[#23a1b6] px-4 py-10">
      <div className="hero-orb -left-20 top-10" />
      <div className="hero-orb right-0 bottom-10" />

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/40 bg-white/90 p-8 text-center shadow-2xl backdrop-blur-md">
        <h1 className="display-font text-3xl font-bold text-black">Logout</h1>
        <p className="mt-3 text-black/75">Are you sure you want to logout from EzPG?</p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => router.push("/city/bangalore")}
            className="flex-1 rounded-xl border border-gray-300 bg-white py-3 font-semibold text-black transition hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 rounded-xl bg-[#0b2856] py-3 font-semibold text-white transition hover:bg-[#081b3b]"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </main>
  )
}
