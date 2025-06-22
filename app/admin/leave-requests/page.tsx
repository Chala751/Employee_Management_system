'use client'
import { useEffect, useState } from 'react'

interface LeaveRequest {
  id: number
  startDate: string
  endDate: string
  reason: string
  status: string
  user: { name: string }
}

export default function AdminLeaveRequestsPage() {
  const [requests, setRequests] = useState<LeaveRequest[]>([])

  const fetchRequests = async () => {
    const res = await fetch('/api/leave')
    const data = await res.json()
    setRequests(data)
  }

  const updateStatus = async (id: number, status: 'APPROVED' | 'REJECTED') => {
    await fetch(`/api/leave/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    })
    fetchRequests()
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Leave Requests</h1>
      <ul className="space-y-4">
        {requests.map((req) => (
          <li key={req.id} className="border p-4 rounded shadow">
            <p><strong>{req.user.name}</strong></p>
            <p>{req.startDate} to {req.endDate}</p>
            <p className="italic text-gray-600">{req.reason}</p>
            <p>Status: <span className="font-semibold">{req.status}</span></p>
            {req.status === 'PENDING' && (
              <div className="flex gap-2 mt-2">
                <button onClick={() => updateStatus(req.id, 'APPROVED')} className="text-green-600">Approve</button>
                <button onClick={() => updateStatus(req.id, 'REJECTED')} className="text-red-600">Reject</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
