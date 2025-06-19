import { prisma } from '@/lib/prisma'
import EmployeeForm from '@/components/EmployeeForm'

interface Props {
  params: { id: string }
}

export default async function EditPage({ params }: Props) {
  const employee = await prisma.employee.findUnique({
    where: { id: Number(params.id) },
  })

  if (!employee) return <p>Employee not found</p>

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit Employee</h2>
      <EmployeeForm id={employee.id} initialData={employee} />
    </div>
  )
}
