"use client"

import type React from "react"

import { ImageIcon, BookOpen, ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FileData {
  name: string
  size: number
  type: string
}

interface CoverStepProps {
  coverFile: FileData | null
  coverPreview: string
  bookTitle: string
  bookAuthor: string
  onCoverUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onGenerateCover: () => void
  onBack: () => void
  onNext: () => void
}

export function CoverStep({
  coverFile,
  coverPreview,
  bookTitle,
  bookAuthor,
  onCoverUpload,
  onGenerateCover,
  onBack,
  onNext,
}: CoverStepProps) {
  return (
    <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Personalizar Capa</CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-300 text-base">
          Escolha uma imagem para a capa do seu e-book
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-purple-100/50 dark:bg-slate-700">
            <TabsTrigger
              value="upload"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600 data-[state=active]:shadow-sm data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-300"
            >
              Upload de Imagem
            </TabsTrigger>
            <TabsTrigger
              value="generate"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-600 data-[state=active]:shadow-sm data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-300"
            >
              Capa Automática
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6 mt-8">
            <div className="border-2 border-dashed border-indigo-300 dark:border-indigo-500 rounded-xl p-10 text-center hover:border-indigo-400 dark:hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-all duration-300 group">
              <ImageIcon className="h-10 w-10 text-indigo-400 dark:text-indigo-400 mx-auto mb-4 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors" />
              <Label
                htmlFor="cover-upload"
                className="text-base font-semibold cursor-pointer text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors"
              >
                Selecionar imagem para capa
              </Label>
              <p className="text-slate-500 dark:text-slate-400 mt-2">
                PNG, JPG até 10MB • Resolução recomendada: 600x800px
              </p>
              <Input id="cover-upload" type="file" accept="image/*" onChange={onCoverUpload} className="hidden" />
            </div>
          </TabsContent>

          <TabsContent value="generate" className="space-y-6 mt-8">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-8 text-center border border-purple-200 dark:border-slate-600">
              <div className="w-40 h-52 bg-gradient-to-br from-purple-500 via-indigo-500 to-violet-600 rounded-lg mx-auto mb-6 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-white text-center">
                  <BookOpen className="h-8 w-8 mx-auto mb-3" />
                  <div className="text-sm font-bold px-2">{bookTitle || "Título do Livro"}</div>
                  <div className="text-xs opacity-90 mt-1 px-2">{bookAuthor || "Nome do Autor"}</div>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={onGenerateCover}
                className="border-purple-300 dark:border-slate-500 hover:bg-purple-50 dark:hover:bg-slate-600 hover:border-purple-400 dark:hover:border-slate-400 transition-all duration-300 bg-transparent dark:bg-slate-700 dark:text-slate-200"
              >
                <Star className="h-4 w-4 mr-2" />
                Gerar Capa Automática
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {coverPreview && (
          <div className="flex justify-center">
            <div className="text-center">
              <img
                src={coverPreview || "/placeholder.svg"}
                alt="Preview da capa"
                className="w-48 h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              />
              <p className="text-slate-600 dark:text-slate-300 mt-4 font-medium">Preview da capa</p>
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 bg-transparent dark:bg-slate-800 dark:text-slate-200"
          >
            Voltar
          </Button>
          <Button
            onClick={onNext}
            disabled={!coverFile}
            className="flex-1 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ArrowRight className="h-5 w-5 mr-2" />
            Próximo: Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
