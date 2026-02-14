"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"

function SuccessContent() {
  const searchParams = useSearchParams()
  const name = searchParams.get("name") || "User"
  const property = searchParams.get("property") || "the selected PG"

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-lg">
        <h1 className="text-3xl font-bold text-black">Request Submitted</h1>

        <p className="mt-4 text-black">
          Thanks, <span className="font-semibold">{name}</span>.
        </p>

        <p className="mt-2 text-black">
          Your booking request for{" "}
          <span className="font-semibold">{property}</span> has been received.
        </p>

        <p className="mt-2 text-black">You will be contacted soon.</p>

        <a
          href="/city/bangalore"
          className="mt-6 inline-block rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Back to Listings
        </a>
      </div>
    </main>
  )
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<p className="p-10 text-center">Loading...</p>}>
      <SuccessContent />
    </Suspense>
  )
}
