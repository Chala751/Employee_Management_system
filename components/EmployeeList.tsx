'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import EmployeeSkeleton from './EmployeeSkeleton'

interface Employee {
  id: number
  name: string
  position: string
}

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/employees')
      const data = await res.json()
      setEmployees(data)
    }
    fetchData()
  }, [])

  if (!employees) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => <EmployeeSkeleton key={i} />)}
      </div>
    )
  }

  return (
    <div>
      <Link href="/employees/new" className="text-blue-500">Add New</Link>
      <ul className="mt-4 space-y-2">
        {employees.map(e => (
          <li key={e.id} className="border-b py-2">
            <p>{e.name} - {e.position}</p>
            <Link href={`/employees/${e.id}/edit`} className="text-sm text-blue-400">Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
