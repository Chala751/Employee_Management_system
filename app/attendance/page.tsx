'use client'
import { useEffect, useState } from 'react'

interface Attendance {
  id: number
  date: string
  present: boolean
}

export default function AttendancePage() {
  const [records, setRecords] = useState<Attendance[]>([])

  useEffect(() => {
    const fetchAttendance = async () => {
      const res = await fetch('/api/attendance')
      const data = await res.json()
      setRecords(data)
    }
    fetchAttendance()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Attendance</h1>
      <ul className="space-y-2">
        {records.map((r) => (
          <li key={r.id} className="flex justify-between">
            <span>{new Date(r.date).toDateString()}</span>
            <span className={r.present ? 'text-green-500' : 'text-red-500'}>
              {r.present ? 'Present' : 'Absent'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
