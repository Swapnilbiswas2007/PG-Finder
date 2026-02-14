"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"

const demoProperties = [
  {
    id: 1,
    name: "Zolo Stays Indiranagar",
    area: "Indiranagar",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb"
  },
  {
    id: 2,
    name: "Stanza Living Valencia House",
    area: "Whitefield",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
  },
  {
    id: 3,
    name: "Nestaway Electronic City",
    area: "Electronic City",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
  },
  {
    id: 4,
    name: "YourSpace Koramangala",
    area: "Koramangala",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
  },
  {
    id: 5,
    name: "Colive Prestige Tech Park",
    area: "Marathahalli",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5"
  }
]

export default function Home() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [showResults, setShowResults] = useState(false)

  const filteredResults = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return demoProperties

    return demoProperties.filter(
      property =>
        property.name.toLowerCase().includes(term) ||
        property.area.toLowerCase().includes(term)
    )
  }, [query])

  function handleSearch() {
    setShowResults(true)
  }

  function handleResultClick(propertyId: number) {
    router.push(`/city/bangalore?selected=${propertyId}`)
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-black">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b2856] via-[#1c4ea1] to-[#23a1b6]">
        <div className="hero-orb -left-24 top-20" />
        <div className="hero-orb right-10 top-10" />

        <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
          <h1 className="display-font text-2xl font-bold text-white">EzPG</h1>
          <a
            href="/login"
            className="rounded-full bg-white/15 px-5 py-2 text-sm font-semibold text-white ring-1 ring-white/40 backdrop-blur transition hover:bg-white hover:text-[#0b2856]"
          >
            Login
          </a>
        </nav>

        <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-6 pb-20 pt-8 md:grid-cols-2 md:px-12 md:pb-24 md:pt-10">
          <div className="animate-rise">
            <p className="mb-4 inline-flex rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white ring-1 ring-white/40">
              Bangalore&apos;s smart PG discovery
            </p>
            <h2 className="display-font text-4xl font-extrabold leading-tight text-white md:text-6xl">
              Find a place that feels like home.
            </h2>
            <p className="mt-5 max-w-xl text-base text-white/90 md:text-lg">
              Browse verified co-living spaces, compare areas, and jump straight to
              map view in one click.
            </p>

            <div className="mt-8">
              <div className="glass-panel relative flex overflow-hidden rounded-2xl">
                <input
                  placeholder="Search by area or property name"
                  className="w-full bg-transparent px-5 py-4 text-black placeholder:text-black/70 outline-none"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onFocus={() => setShowResults(true)}
                  onClick={() => setShowResults(true)}
                />
                <button
                  onClick={handleSearch}
                  className="m-1 rounded-xl bg-[#0b2856] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#081b3b]"
                >
                  Search
                </button>
              </div>

              {showResults && (
                <div className="mt-3 max-h-64 overflow-auto rounded-2xl bg-white/95 p-2 shadow-2xl ring-1 ring-black/10 backdrop-blur">
                  {filteredResults.length > 0 ? (
                    filteredResults.map(property => (
                      <button
                        key={property.id}
                        onClick={() => handleResultClick(property.id)}
                        className="mb-1 flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-black transition hover:bg-[#e8f0ff]"
                      >
                        <span className="font-semibold">{property.name}</span>
                        <span className="text-sm text-black/75">{property.area}</span>
                      </button>
                    ))
                  ) : (
                    <p className="px-3 py-3 text-black">No results found.</p>
                  )}
                </div>
              )}
            </div>

            <a
              href="/city/bangalore"
              className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-[#0b2856] shadow-lg transition hover:-translate-y-0.5"
            >
              Explore Bangalore
            </a>
          </div>

          <div className="animate-float">
            <div className="overflow-hidden rounded-3xl border border-white/30 bg-white/20 p-3 shadow-2xl backdrop-blur-md">
              <img
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
                alt="Modern PG room"
                className="h-64 w-full rounded-2xl object-cover md:h-[420px]"
              />
              <div className="mt-3 rounded-2xl bg-white p-4 text-black">
                <p className="text-sm font-semibold text-[#1c4ea1]">Trending This Week</p>
                <p className="display-font mt-1 text-xl font-bold">Premium Rooms under 10k</p>
                <p className="mt-1 text-sm text-black/75">Whitefield, Indiranagar, Koramangala</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 md:px-12">
        <h3 className="display-font text-3xl font-bold">Popular Picks</h3>
        <p className="mt-2 text-black/75">Tap a card to open that listing directly on the map.</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {demoProperties.slice(0, 3).map((property, index) => (
            <button
              key={property.id}
              onClick={() => handleResultClick(property.id)}
              className="animate-rise overflow-hidden rounded-2xl bg-white text-left shadow-md ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl"
              style={{ animationDelay: `${index * 140}ms` }}
            >
              <img
                src={property.image}
                alt={property.name}
                className="h-44 w-full object-cover"
              />
              <div className="p-4">
                <p className="display-font text-lg font-semibold">{property.name}</p>
                <p className="mt-1 text-sm text-black/70">{property.area}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-12">
        <div className="grid gap-5 md:grid-cols-3">
          <Feature title="Verified PGs" desc="All properties are reviewed before listing." />
          <Feature title="Quick Search" desc="Area-based search with instant map redirection." />
          <Feature title="Student Friendly" desc="Budget, food, and essentials prioritized." />
        </div>
      </section>

      <footer className="bg-[#0b1b38] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3 md:px-12">
          <div>
            <h4 className="display-font text-xl font-bold">EzPG</h4>
            <p className="mt-3 text-sm text-white/80">
              Find verified PGs faster and book your preferred stay in minutes.
            </p>
          </div>

          <div>
            <h5 className="text-sm font-semibold uppercase tracking-wide text-white/90">Legal</h5>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <a href="/terms" className="text-white/80 hover:text-white">Terms and Conditions</a>
              <a href="/privacy" className="text-white/80 hover:text-white">Privacy Policy</a>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-semibold uppercase tracking-wide text-white/90">Socials</h5>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white">Instagram</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white">LinkedIn</a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="text-white/80 hover:text-white">X (Twitter)</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 bg-[#08152d]">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-4 text-sm text-white/85 md:flex-row md:items-center md:justify-between md:px-12">
            <p>Contact us: <a href="mailto:support@ezpg.in" className="font-semibold text-white">support@ezpg.in</a> | <a href="tel:+919999999999" className="font-semibold text-white">+91 99999 99999</a></p>
            <p>Copyright {new Date().getFullYear()} EzPG. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="animate-rise rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5">
      <h4 className="display-font text-xl font-bold">{title}</h4>
      <p className="mt-2 text-sm text-black/75">{desc}</p>
    </div>
  )
}
