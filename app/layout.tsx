// app/layout.tsx
import '../global.css'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Employee Management System',
  description: 'Manage employees easily',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Navbar /> 
          <main className="max-w-5xl mx-auto">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
