// app/page.tsx
export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <div className="text-center max-w-2xl px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Welcome to Employee Management System
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Effortlessly manage your team with modern tools — create, update, and track employees with ease.
        </p>
        <a
          href="/employees"
          className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-gray-100 transition"
        >
          View Employees
        </a>
      </div>
    </div>
  )
}

