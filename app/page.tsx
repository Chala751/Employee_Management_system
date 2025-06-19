export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br   text-white">
      <div className="text-center max-w-xl space-y-6 px-4">
        <h1 className="text-5xl font-extrabold drop-shadow-lg text-blue-600">Welcome to EMS</h1>
        <p className="text-lg font-light drop-shadow-sm">
          Manage your employees with ease. Add, view, update, and remove employee data effortlessly.
        </p>
        <a
          href="/employees"
          className="inline-block bg-white text-blue-500 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          View Employees
        </a>
      </div>
    </div>
  )
}
