'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import EmployeeSkeleton from './EmployeeSkeleton'
import { toast } from 'sonner'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import ConfirmDeleteDialog from './ConfirmDeleteDialog'


interface Employee {
  id: number
  name: string
  position: string
}

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[] | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchEmployees = async () => {
    setLoading(true)
    const res = await fetch('/api/employees')
    const data = await res.json()
    setEmployees(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/employees/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      toast.success('Employee deleted')
      fetchEmployees()
    } catch (err) {
      toast.error('Failed to delete employee')
    }
  }

  if (loading || !employees) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => <EmployeeSkeleton key={i} />)}
      </div>
    )
  }

  return (
    <div>
      <Link
        href="/employees/new"
        className="inline-flex items-center text-blue-500 hover:underline"
      >
        <Plus className="w-5 h-5 mr-1" />
        Add New
      </Link>
      <ul className="mt-4 space-y-3">
        {employees.map(e => (
          <li
            key={e.id}
            className="flex justify-between items-center border p-4 rounded shadow-sm bg-white "
          >
            <div>
              <p className="font-semibold">{e.name}</p>
              <p className="text-sm text-gray-600 dark:text-black">{e.position}</p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/employees/${e.id}/edit`}
                className="inline-flex items-center text-blue-600 hover:underline"
              >
                <Edit2 className="w-4 h-4 mr-1" />
                Edit
              </Link>
              <ConfirmDeleteDialog onConfirm={() => handleDelete(e.id)} />

            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
