'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type ThemeContextType = {
  toggleTheme: () => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  isDark: false,
})

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const enabled = saved === 'dark' || (!saved && prefersDark)

    setIsDark(enabled)
    document.documentElement.classList.toggle('dark', enabled)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', newTheme)
    console.log('Theme switched:', newTheme ? 'dark' : 'light')

  }

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  )
}
