"use client"

import { BookOpen, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="text-center mb-12 relative">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="absolute top-0 right-0 border-purple-300 hover:bg-purple-50 dark:border-slate-600 dark:hover:bg-slate-700 dark:bg-slate-800 bg-transparent"
      >
        {theme === "light" ? (
          <Moon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
        ) : (
          <Sun className="h-4 w-4 text-purple-400" />
        )}
      </Button>

      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-xl shadow-lg">
          <BookOpen className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
          EPUB Converter
        </h1>
      </div>
      <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
        Converta seus arquivos PDF para EPUB com facilidade. Personalize a capa e baixe seu e-book pronto para leitura.
      </p>
    </div>
  )
}
