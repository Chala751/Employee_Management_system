'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LeavePage() {
  const [form, setForm] = useState({ startDate: '', endDate: '', reason: '' })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/leave', {
      method: 'POST',
      body: JSON.stringify(form),
    })
    router.push('/attendance')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md p-6 space-y-4">
      <h1 className="text-2xl font-bold">Leave Request</h1>
      <input type="date" required value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} />
      <input type="date" required value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} />
      <textarea placeholder="Reason" value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  )
}
