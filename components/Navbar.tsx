// components/Navbar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 mb-6 shadow">
      <div className="flex justify-between items-center">
        <Link href="/" className="font-bold text-lg">
          EmployeeMS
        </Link>
        <div className="space-x-4">
          <Link href="/" className={pathname === '/' ? 'underline' : ''}>Home</Link>
          <Link href="/employees" className={pathname.startsWith('/employees') ? 'underline' : ''}>Employees</Link>
          <Link href="/employees/new" className={pathname === '/employees/new' ? 'underline' : ''}>Add</Link>
        </div>
      </div>
    </nav>
  )
}
