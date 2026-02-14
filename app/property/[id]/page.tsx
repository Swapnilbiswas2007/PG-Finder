export default function PropertyDetail() {
  return (
    <main className="p-10 bg-gray-100 min-h-screen">

      <div className="bg-white p-6 rounded shadow max-w-4xl mx-auto">

        {/* IMAGE GALLERY */}
        <div className="grid grid-cols-3 gap-2">
          <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2" className="rounded"/>
          <img src="https://images.unsplash.com/photo-1554995207-c18c203602cb" className="rounded"/>
          <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688" className="rounded"/>
        </div>

        <h1 className="text-4xl font-bold mt-6">
          Zolo Alpha
        </h1>

        <p className="text-gray-500 mt-2">
          Whitefield, Bangalore
        </p>

        <p className="text-2xl font-bold mt-4">
          ₹7,000/month
        </p>

        <button
            onClick={() => alert("🎉 Booking request submitted!")}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded text-lg hover:bg-green-700 transition"
        >
    Book Now
</button>


      </div>

    </main>
  )
}
