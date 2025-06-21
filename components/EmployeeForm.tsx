'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
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


const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  position: z.string().min(2, 'Position is required'),
})

type FormData = z.infer<typeof schema>

export default function EmployeeForm({ initialData = { name: '', email: '', position: '' }, id }: Props) {
  const router = useRouter()

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  })

  const onSubmit = async (data: FormData) => {
    if (id) {
      await axios.put(`/api/employees/${id}`, data)
    } else {
      await axios.post('/api/employees', data)
    }
    router.push('/employees')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <input {...register('name')} placeholder="Name" className="border p-2 w-full" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <input {...register('email')} placeholder="Email" className="border p-2 w-full" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <input {...register('position')} placeholder="Position" className="border p-2 w-full" />
        {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
        {id ? 'Update' : 'Create'}
      </button>
    </form>
  )
}
