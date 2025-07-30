"use client"

import type React from "react"

import { Upload, FileText, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FileData {
  name: string
  size: number
  type: string
}

interface UploadStepProps {
  pdfFile: FileData | null
  bookTitle: string
  bookAuthor: string
  onPdfUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onTitleChange: (title: string) => void
  onAuthorChange: (author: string) => void
  onNext: () => void
}

export function UploadStep({
  pdfFile,
  bookTitle,
  bookAuthor,
  onPdfUpload,
  onTitleChange,
  onAuthorChange,
  onNext,
}: UploadStepProps) {
  return (
    <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Upload do Arquivo PDF
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-300 text-base">
          Selecione o arquivo PDF que deseja converter para EPUB
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="border-2 border-dashed border-purple-300 dark:border-purple-500 rounded-xl p-12 text-center hover:border-purple-400 dark:hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-900/20 transition-all duration-300 group">
          <Upload className="h-12 w-12 text-purple-400 dark:text-purple-400 mx-auto mb-4 group-hover:text-purple-500 dark:group-hover:text-purple-300 transition-colors" />
          <div className="space-y-2">
            <Label
              htmlFor="pdf-upload"
              className="text-lg font-semibold cursor-pointer text-slate-700 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors"
            >
              Clique para selecionar ou arraste o arquivo PDF aqui
            </Label>
            <p className="text-slate-500 dark:text-slate-400">Arquivos PDF até 50MB</p>
          </div>
          <Input id="pdf-upload" type="file" accept=".pdf" onChange={onPdfUpload} className="hidden" />
        </div>

        {pdfFile && (
          <Alert className="bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-800/50 rounded-full">
                <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <AlertDescription className="text-emerald-800 dark:text-emerald-200">
                Arquivo selecionado: <strong>{pdfFile.name}</strong>
                <span className="text-emerald-600 dark:text-emerald-400 ml-2">
                  ({(pdfFile.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </AlertDescription>
            </div>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="book-title" className="text-slate-700 dark:text-slate-200 font-medium">
              Título do Livro
            </Label>
            <Input
              id="book-title"
              value={bookTitle}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Digite o título do livro"
              className="border-slate-300 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500/20 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="book-author" className="text-slate-700 dark:text-slate-200 font-medium">
              Autor
            </Label>
            <Input
              id="book-author"
              value={bookAuthor}
              onChange={(e) => onAuthorChange(e.target.value)}
              placeholder="Digite o nome do autor"
              className="border-slate-300 dark:border-slate-600 focus:border-purple-500 focus:ring-purple-500/20 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-400"
            />
          </div>
        </div>

        <Button
          onClick={onNext}
          disabled={!pdfFile || !bookTitle}
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <ArrowRight className="h-5 w-5 mr-2" />
          Próximo: Escolher Capa
        </Button>
      </CardContent>
    </Card>
  )
}
