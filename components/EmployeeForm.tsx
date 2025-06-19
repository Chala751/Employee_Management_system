'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

interface Props {
  initialData?: {
    name: string
    email: string
    position: string
  }
  id?: number
}

export default function EmployeeForm({ initialData = { name: '', email: '', position: '' }, id }: Props) {
  const [form, setForm] = useState(initialData)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (id) {
      await axios.put(`/api/employees/${id}`, form)
    } else {
      await axios.post('/api/employees', form)
    }
    router.push('/employees')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" className="border p-2 w-full" />
      <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" className="border p-2 w-full" />
      <input value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} placeholder="Position" className="border p-2 w-full" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Submit</button>
    </form>
  )
}
