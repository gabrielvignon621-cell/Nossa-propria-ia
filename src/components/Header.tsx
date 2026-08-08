'use client'

import React from 'react'
import { Menu, Settings, User, Moon, Sun } from 'lucide-react'

interface HeaderProps {
  onMenuClick: () => void
  title?: string
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, title = 'Chat' }) => {
  const [isDark, setIsDark] = React.useState(true)

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    html.classList.toggle('dark')
    setIsDark(!isDark)
    localStorage.setItem('theme', isDark ? 'light' : 'dark')
  }

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 py-4 flex items-center justify-between backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-all duration-200"
        >
          <Menu className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
        </button>
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white truncate">{title}</h2>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-all duration-200"
          title="Alternar tema"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          ) : (
            <Moon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          )}
        </button>
        <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-all duration-200 hidden md:inline-flex">
          <Settings className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
        </button>
        <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-all duration-200">
          <User className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
        </button>
      </div>
    </header>
  )
}

export default Header
