'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Employee } from '@/types'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

export default function DashboardPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/employees')
      const data = await res.json()
      setEmployees(data)
    }
    fetchData()
  }, [])

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase())
  )

  const chartData = [
    { name: 'Total', count: employees.length },
    { name: 'Filtered', count: filtered.length },
  ]

  return (
    <div className="p-6 space-y-8">
      <motion.h1
        className="text-3xl font-bold text-blue-600 dark:text-blue-400"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Employee Dashboard
      </motion.h1>

      <div className="max-w-md mb-5">
        <Input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Employee Chart</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Employees</h2>
          <ul className="space-y-2">
            {filtered.map(e => (
              <li key={e.id} className="border-b pb-1">
                <span className="font-medium">{e.name}</span> – {e.position}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
