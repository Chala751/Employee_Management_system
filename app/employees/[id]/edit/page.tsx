import { prisma } from '@/lib/prisma'
import EmployeeForm from '@/components/EmployeeForm'

interface Props {
  params: { id: string }
}

export default async function EditPage({ params }: Props) {
  const employee = await prisma.employee.findUnique({
    where: { id: Number(params.id) },
  })

  if (!employee) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg font-medium"> Employee not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Employee</h2>
        <EmployeeForm id={employee.id} initialData={employee} />
      </div>
    </div>
  )
}
