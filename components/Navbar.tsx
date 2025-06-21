'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'
import { Moon, Sun } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const { toggleTheme, isDark } = useTheme()

  const navItem = (href: string, label: string) => (
    <Link
      href={href}
      className={`px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition ${
        pathname === href ? 'bg-blue-800 text-white' : ''
      }`}
    >
      {label}
    </Link>
  )

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-tight">
          EmployeeMS
        </Link>

        <div className="flex gap-2 items-center">
          {navItem('/', 'Home')}
          {navItem('/employees', 'Employees')}
          {navItem('/employees/new', 'Add Employee')}

          <button
            onClick={toggleTheme}
            className="ml-2 p-2 rounded-md hover:bg-blue-500 transition"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} className="text-yellow-300" /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  )
}
