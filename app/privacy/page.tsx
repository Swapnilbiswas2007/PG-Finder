export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white p-8 shadow">
        <h1 className="text-3xl font-bold text-black">Privacy Policy</h1>
        <p className="mt-4 text-black">
          EzPG collects basic user information such as name, email, phone number, and
          booking preferences to process inquiries and improve platform experience.
        </p>
        <p className="mt-3 text-black">
          We do not sell personal data. Information may be shared with relevant property
          partners only for booking coordination.
        </p>
        <p className="mt-3 text-black">
          You can contact us for any data-related request at
          <span className="font-semibold"> support@ezpg.in</span>.
        </p>
      </div>
    </main>
  )
}
