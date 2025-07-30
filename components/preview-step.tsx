"use client"

import { FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface FileData {
  name: string
  size: number
  type: string
}

interface PreviewStepProps {
  bookTitle: string
  bookAuthor: string
  pdfFile: FileData | null
  coverFile: FileData | null
  coverPreview: string
  isConverting: boolean
  conversionProgress: number
  onBack: () => void
  onConvert: () => void
}

export function PreviewStep({
  bookTitle,
  bookAuthor,
  pdfFile,
  coverFile,
  coverPreview,
  isConverting,
  conversionProgress,
  onBack,
  onConvert,
}: PreviewStepProps) {
  const bookInfo = [
    { label: "Título", value: bookTitle },
    { label: "Autor", value: bookAuthor },
    { label: "Arquivo PDF", value: pdfFile?.name },
    { label: "Capa", value: coverFile?.name },
  ]

  return (
    <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Preview do E-book</CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-300 text-base">
          Revise as informações antes de gerar o arquivo EPUB
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              Informações do Livro
            </h3>
            <div className="space-y-4">
              {bookInfo.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-lg border border-purple-200 dark:border-slate-600"
                >
                  <div>
                    <span className="font-semibold text-purple-700 dark:text-purple-300">{label}:</span>
                    <span className="text-slate-600 dark:text-slate-300 ml-2">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            {coverPreview && (
              <img
                src={coverPreview || "/placeholder.svg"}
                alt="Capa do livro"
                className="w-48 h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              />
            )}
          </div>
        </div>

        {isConverting && (
          <div className="space-y-4 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-xl border border-purple-200 dark:border-slate-600">
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-slate-800 dark:text-slate-100">Convertendo...</span>
              <span className="text-purple-600 dark:text-purple-400 font-bold">{conversionProgress}%</span>
            </div>
            <Progress value={conversionProgress} className="w-full h-2" />
          </div>
        )}

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            disabled={isConverting}
            className="border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 bg-transparent dark:bg-slate-800 dark:text-slate-200"
          >
            Voltar
          </Button>
          <Button
            onClick={onConvert}
            disabled={isConverting}
            className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            {isConverting ? "Convertendo..." : "Converter para EPUB"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
