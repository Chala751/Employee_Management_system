'use client'
import Image from 'next/image'
import emsImage from './images/ems1.jpg' 
import emsImage2 from './images/ems2.jpg' 
import emsImage3 from './images/ems3.avif' 
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, SunMoon, Settings } from 'lucide-react'
import Link from 'next/link'

interface Employee {
  id: number
  name: string
  position: string
}

export default function HomePage() {
  const [recentEmployees, setRecentEmployees] = useState<Employee[]>([])

  useEffect(() => {
    const fetchRecent = async () => {
      const res = await fetch('/api/employees')
      const data = await res.json()
      setRecentEmployees(data.slice(-3).reverse()) // get last 3
    }
    fetchRecent()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white flex flex-col ">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center  mx-auto">
        <motion.h1
          className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 drop-shadow"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Welcome to EMS
        </motion.h1>
        
         <Image
           src={emsImage}
           alt="EMS Dashboard Preview"
            className="rounded-xl shadow-xl mx-auto mt-4" 
           width={800}
           height={500}
          />
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          Manage your employees with ease. Add, view, update, and remove employee data effortlessly.
        </p>

        <Link
          href="/employees"
          className="mt-6 inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-500 transition"
        >
          View Employees
        </Link>
      </section>

      {/* Features */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-center px-4">
        <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow">
          <Users className="mx-auto mb-2 h-8 w-8 text-blue-500" />
          <h3 className="font-bold mb-1">Employee CRUD</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Full control over employee records. Add, edit, delete with ease.
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow">
          <SunMoon className="mx-auto mb-2 h-8 w-8 text-yellow-400" />
          <h3 className="font-bold mb-1">Dark Mode</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Toggle between light and dark themes easily.
          </p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow">
          <Settings className="mx-auto mb-2 h-8 w-8 text-gray-500 dark:text-gray-200" />
          <h3 className="font-bold mb-1">Modern UI</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Built with Next.js, Tailwind CSS, and TypeScript.
          </p>
        </div>
      </section>

      {/* Recent Employees */}
      {recentEmployees.length > 0 && (
        <section className="mt-16 px-4 max-w-4xl mx-auto">
          <Image
           src={emsImage2}
           alt="EMS Dashboard Preview"
            className="rounded-xl shadow-xl mx-auto mt-4 mb-5" 
           width={800}
           height={500}
          />
          <h2 className="text-2xl font-bold mb-6 text-center">Recent Employees</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {recentEmployees.map((emp) => (
              <div
                key={emp.id}
                className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow"
              >
                <p className="font-semibold">{emp.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">{emp.position}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="mt-16 px-6 py-12 bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center mb-8">What People Say</h2>
        <Image
           src={emsImage3}
           alt="EMS Dashboard Preview"
            className="rounded-xl shadow-xl mx-auto mt-4 mb-5" 
           width={600}
           height={400}
          />
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto text-center">
          {[
            {
              quote: 'This EMS tool saved our HR team hours of work every week!',
              name: 'HR Manager, TechCo',
            },
            {
              quote: 'Simple and intuitive, love the dark mode!',
              name: 'Frontend Dev, StartupX',
            },
            {
              quote: 'Very useful for managing contract staff on the go.',
              name: 'Admin Officer, OrgY',
            },
          ].map((t, i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow">
              <p className="italic text-gray-700 dark:text-gray-300">"{t.quote}"</p>
              <p className="mt-2 font-semibold text-blue-600 dark:text-blue-400">{t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-center py-6 bg-blue-600 text-white dark:bg-gray-900">
        <p>
          &copy; {new Date().getFullYear()} Developed by{' '}
          <a
            href="https://github.com/Chala751"
            className="underline hover:text-blue-300"
            target="_blank"
          >
            Chala Temesgen
          </a>
        </p>
      </footer>
    </div>
  )
}
