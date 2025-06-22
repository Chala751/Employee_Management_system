'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const { toggleTheme, isDark } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const navItem = (href: string, label: string) => (
    <Link
      href={href}
      onClick={() => setIsOpen(false)}
      className={`block px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition ${
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

        {/* Desktop nav */}
        <div className="hidden md:flex gap-2 items-center">
          {navItem('/', 'Home')}
          {navItem('/employees', 'Employees')}
          {navItem('/employees/new', 'Add Employee')}
          {navItem('/dashboard', 'Dashboard')}
          <button
            onClick={toggleTheme}
            className="ml-2 p-2 rounded-md hover:bg-blue-500 transition"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} className="text-yellow-300" /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile toggle button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md hover:bg-blue-500 transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-3 space-y-2">
          {navItem('/', 'Home')}
          {navItem('/employees', 'Employees')}
          {navItem('/employees/new', 'Add Employee')}
          {navItem('/dashboard', 'Dashboard')}
          <button
            onClick={() => {
              toggleTheme()
              setIsOpen(false)
            }}
            className="w-full flex items-center gap-2 p-2 rounded-md hover:bg-blue-500 transition"
          >
            {isDark ? <Sun size={18} className="text-yellow-300" /> : <Moon size={18} />}
            Toggle Theme
          </button>
        </div>
      )}
    </nav>
  )
}
