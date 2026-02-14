"use client"

import { useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"

const propertyNames: Record<number, string> = {
  1: "Zolo Stays Indiranagar",
  2: "Stanza Living Valencia House",
  3: "Nestaway Electronic City",
  4: "YourSpace Koramangala",
  5: "Colive Prestige Tech Park"
}

export default function BookPropertyPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const propertyId = Number(params.id)

  const propertyName = useMemo(() => {
    return propertyNames[propertyId] || "Selected PG"
  }, [propertyId])

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [moveInDate, setMoveInDate] = useState("")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const query = new URLSearchParams({
      name,
      property: propertyName
    })

    router.push(`/book/success?${query.toString()}`)
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto w-full max-w-xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-black">Book Now</h1>
        <p className="mt-2 text-black">
          You are booking: <span className="font-semibold">{propertyName}</span>
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-black">Full Name</label>
            <input
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder:text-black/60 outline-none focus:border-blue-600"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-black">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder:text-black/60 outline-none focus:border-blue-600"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-black">Phone Number</label>
            <input
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-black placeholder:text-black/60 outline-none focus:border-blue-600"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-black">Preferred Move-in Date</label>
            <input
              required
              type="date"
              value={moveInDate}
              onChange={e => setMoveInDate(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-black outline-none focus:border-blue-600"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-md bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Submit Request
          </button>
        </form>
      </div>
    </main>
  )
}
