import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const data = await req.json()
  const employee = await prisma.employee.create({ data })
  return NextResponse.json(employee)
}
