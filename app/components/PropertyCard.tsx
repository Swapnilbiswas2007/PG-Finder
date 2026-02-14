export default function PropertyCard({
  id,
  name,
  area,
  price,
  img,
  onBookNow
}: {
  id: number
  name: string
  area: string
  price: string
  img: string
  onBookNow?: (id: number) => void
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <img
          src={img}
          className="h-52 w-full object-cover"
          alt={name}
        />

        <span className="absolute left-3 top-3 rounded-full bg-[#0b2856] px-3 py-1 text-xs font-semibold text-white shadow">
          Verified
        </span>
      </div>

      <div className="p-4 text-black">
        <h2 className="display-font text-xl font-semibold leading-tight">{name}</h2>

        <p className="mt-1 text-sm text-black/75">{area}</p>

        <p className="mt-2 text-lg font-bold text-[#0b2856]">{price}/month</p>

        <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
          <span className="rounded-full bg-[#e7f4ee] px-3 py-1 text-[#0f6b3d]">WiFi</span>
          <span className="rounded-full bg-[#e9f0ff] px-3 py-1 text-[#1c4ea1]">Food</span>
          <span className="rounded-full bg-[#f0eaff] px-3 py-1 text-[#5032a1]">AC</span>
        </div>

        <button
          onClick={e => {
            e.stopPropagation()
            onBookNow?.(id)
          }}
          className="mt-4 w-full rounded-xl bg-[#0b2856] py-2.5 font-semibold text-white transition hover:bg-[#081b3b]"
        >
          Book Now
        </button>
      </div>
    </div>
  )
}
