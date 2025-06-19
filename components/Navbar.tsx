'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const navItem = (href: string, label: string) => (
    <Link
      href={href}
      className={`px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${
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
        <div className="flex gap-2">
          {navItem('/', 'Home')}
          {navItem('/employees', 'Employees')}
          {navItem('/employees/new', 'Add Employee')}
        </div>
      </div>
    </nav>
  )
}
