"use client"

export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import PropertyCard from "../../components/PropertyCard"

const properties = [
  {
    id: 1,
    name: "Zolo Stays Indiranagar",
    area: "Indiranagar",
    price: "Rs 9,000",
    img: "https://images.unsplash.com/photo-1554995207-c18c203602cb",
    coords: "12.9784,77.6408"
  },
  {
    id: 2,
    name: "Stanza Living Valencia House",
    area: "Whitefield",
    price: "Rs 8,200",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    coords: "12.9698,77.7500"
  },
  {
    id: 3,
    name: "Nestaway Electronic City",
    area: "Electronic City",
    price: "Rs 6,800",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    coords: "12.8399,77.6770"
  },
  {
    id: 4,
    name: "YourSpace Koramangala",
    area: "Koramangala",
    price: "Rs 10,500",
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    coords: "12.9352,77.6245"
  },
  {
    id: 5,
    name: "Colive Prestige Tech Park",
    area: "Marathahalli",
    price: "Rs 7,500",
    img: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5",
    coords: "12.9591,77.6974"
  }
]

export default function CityContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const selectedFromQuery = Number(searchParams.get("selected"))
  const initialSelected = properties.some(p => p.id === selectedFromQuery)
    ? selectedFromQuery
    : 1

  const [selected, setSelected] = useState(initialSelected)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true"
    if (!isLoggedIn) router.push("/login")
  }, [router])

  useEffect(() => {
    setSelected(initialSelected)
  }, [initialSelected])

  const selectedProperty = properties.find(p => p.id === selected)!

  return (
    <main className="min-h-screen bg-[#f5f7fb]">
      {/* ⭐ YOUR UI — UNTOUCHED ⭐ */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b2856] via-[#1c4ea1] to-[#23a1b6] px-6 pb-8 pt-8 md:px-12">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-white/90">City Listings</p>
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              PGs in Bangalore
            </h1>
          </div>

          <div className="flex gap-3">
            <a href="/" className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white">
              Home
            </a>
            <a href="/logout" className="rounded-full bg-[#0b2856] px-5 py-2 text-sm font-semibold text-white">
              Logout
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:px-6 lg:grid-cols-2">
        <div className="h-[75vh] overflow-y-auto rounded-2xl bg-white/75 p-4 shadow-lg">
          <div className="grid gap-5">
            {properties.map(property => (
              <div
                key={property.id}
                onClick={() => setSelected(property.id)}
                className={`cursor-pointer ${
                  selected === property.id ? "ring-4 ring-[#1c4ea1]/35" : ""
                }`}
              >
                <PropertyCard
                  {...property}
                  onBookNow={id => router.push(`/book/${id}`)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-3 shadow-lg">
          <div className="mb-2 text-sm font-medium text-[#0b2856]">
            Showing map for: {selectedProperty.name}
          </div>
          <iframe
            src={`https://maps.google.com/maps?q=${selectedProperty.coords}&z=14&output=embed`}
            className="h-[75vh] w-full rounded-xl border-0"
            loading="lazy"
          />
        </div>
      </section>
    </main>
  )
}
