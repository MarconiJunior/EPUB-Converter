"use client"

import { Download, ArrowRight, BookOpen, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DownloadStepProps {
  bookTitle: string
  onDownload: () => void
  onReset: () => void
}

export function DownloadStep({ bookTitle, onDownload, onReset }: DownloadStepProps) {
  return (
    <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm">
      <CardHeader className="text-center pb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-800/50 dark:to-green-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">
          Conversão Concluída!
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-300 text-lg">
          Seu arquivo EPUB está pronto para download
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-800/50 dark:to-indigo-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Download className="h-12 w-12 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{bookTitle}.epub</h3>
          <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-md mx-auto">
            Arquivo convertido com sucesso! Clique no botão abaixo para fazer o download do seu e-book.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            onClick={onDownload}
            size="lg"
            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Download className="h-5 w-5 mr-3" />
            Baixar EPUB
          </Button>
          <Button
            variant="outline"
            onClick={onReset}
            className="w-full h-12 border-purple-300 dark:border-slate-600 hover:bg-purple-50 dark:hover:bg-slate-700 hover:border-purple-400 dark:hover:border-slate-500 transition-all duration-300 bg-transparent dark:bg-slate-800 dark:text-slate-200"
          >
            <ArrowRight className="h-5 w-5 mr-2" />
            Converter Outro Arquivo
          </Button>
        </div>

        <Alert className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 border-indigo-200 dark:border-slate-600">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-800/50 rounded-full">
              <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <AlertDescription className="text-indigo-800 dark:text-indigo-200">
              <strong>Dica:</strong> Você pode abrir o arquivo EPUB em leitores como Calibre, Adobe Digital Editions, ou
              aplicativos de e-book no seu dispositivo móvel. O formato EPUB é compatível com a maioria dos dispositivos
              de leitura.
            </AlertDescription>
          </div>
        </Alert>
      </CardContent>
    </Card>
  )
}
