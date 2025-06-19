import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { PrismaClient, Employee } from '@/app/generated/prisma'



export default async function EmployeeList() {
  const employees: Employee[] = await prisma.employee.findMany()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <Link href="/employees/new" className="text-blue-500">Add New</Link>
      <ul>
        {employees.map((e: Employee) => 
          <li key={e.id} className="border-b py-2">
            <p>{e.name} - {e.position}</p>
            <Link href={`/employees/${e.id}/edit`} className="text-sm text-blue-400">Edit</Link>
          </li>
        )}
      </ul>
    </div>
  )
}
