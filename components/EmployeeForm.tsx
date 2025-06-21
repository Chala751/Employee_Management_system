'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'

interface Props {
  initialData?: {
    name: string
    email: string
    position: string
  }
  id?: number
}

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  position: z.string().min(2, 'Position is required'),
})

type FormData = z.infer<typeof schema>

export default function EmployeeForm({ initialData = { name: '', email: '', position: '' }, id }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      if (id) {
        await axios.put(`/api/employees/${id}`, data)
        toast.success('Employee updated successfully')
      } else {
        await axios.post('/api/employees', data)
        toast.success('Employee added successfully')
      }
      router.push('/employees')
    } catch (error) {
      toast.error('Submission failed already existing email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <input
          {...register('name')}
          placeholder="Name"
          className="border p-2 w-full rounded"
          disabled={loading}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <input
          {...register('email')}
          placeholder="Email"
          className="border p-2 w-full rounded"
          disabled={loading}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <input
          {...register('position')}
          placeholder="Position"
          className="border p-2 w-full rounded"
          disabled={loading}
        />
        {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
      >
        {loading ? 'Submitting...' : id ? 'Update' : 'Create'}
      </button>
    </form>
  )
}
