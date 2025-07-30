"use client"

import type React from "react"

import { useState } from "react"
import { ThemeProvider } from "@/hooks/use-theme"
import { Header } from "@/components/header"
import { ProgressSteps } from "@/components/progress-steps"
import { UploadStep } from "@/components/upload-step"
import { CoverStep } from "@/components/cover-step"
import { PreviewStep } from "@/components/preview-step"
import { DownloadStep } from "@/components/download-step"

type ConversionStep = "upload" | "cover" | "preview" | "download"

interface FileData {
  name: string
  size: number
  type: string
  content?: string
}

function EPUBConverterContent() {
  const [currentStep, setCurrentStep] = useState<ConversionStep>("upload")
  const [pdfFile, setPdfFile] = useState<FileData | null>(null)
  const [coverFile, setCoverFile] = useState<FileData | null>(null)
  const [coverPreview, setCoverPreview] = useState<string>("")
  const [bookTitle, setBookTitle] = useState("")
  const [bookAuthor, setBookAuthor] = useState("")
  const [isConverting, setIsConverting] = useState(false)
  const [conversionProgress, setConversionProgress] = useState(0)

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setPdfFile({
        name: file.name,
        size: file.size,
        type: file.type,
      })
      const titleFromName = file.name.replace(".pdf", "").replace(/[-_]/g, " ")
      setBookTitle(titleFromName)
    }
  }

  const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setCoverFile({
        name: file.name,
        size: file.size,
        type: file.type,
      })

      const reader = new FileReader()
      reader.onload = (e) => {
        setCoverPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerateCover = () => {
    setCoverPreview("/placeholder.svg?height=400&width=300&text=Capa+Gerada")
    setCoverFile({ name: "capa-gerada.jpg", size: 150000, type: "image/jpeg" })
  }

  const simulateConversion = async () => {
    setIsConverting(true)
    setConversionProgress(0)

    const steps = [
      { progress: 20, message: "Analisando PDF..." },
      { progress: 40, message: "Extraindo texto..." },
      { progress: 60, message: "Processando imagens..." },
      { progress: 80, message: "Gerando EPUB..." },
      { progress: 100, message: "Conversão concluída!" },
    ]

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setConversionProgress(step.progress)
    }

    setIsConverting(false)
    setCurrentStep("download")
  }

  const downloadEPUB = () => {
    const blob = new Blob(["EPUB content would be here"], { type: "application/epub+zip" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${bookTitle || "converted-book"}.epub`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const resetConverter = () => {
    setCurrentStep("upload")
    setPdfFile(null)
    setCoverFile(null)
    setCoverPreview("")
    setBookTitle("")
    setBookAuthor("")
    setConversionProgress(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <ProgressSteps currentStep={currentStep} />

        <div className="max-w-4xl mx-auto">
          {currentStep === "upload" && (
            <UploadStep
              pdfFile={pdfFile}
              bookTitle={bookTitle}
              bookAuthor={bookAuthor}
              onPdfUpload={handlePdfUpload}
              onTitleChange={setBookTitle}
              onAuthorChange={setBookAuthor}
              onNext={() => setCurrentStep("cover")}
            />
          )}

          {currentStep === "cover" && (
            <CoverStep
              coverFile={coverFile}
              coverPreview={coverPreview}
              bookTitle={bookTitle}
              bookAuthor={bookAuthor}
              onCoverUpload={handleCoverUpload}
              onGenerateCover={handleGenerateCover}
              onBack={() => setCurrentStep("upload")}
              onNext={() => setCurrentStep("preview")}
            />
          )}

          {currentStep === "preview" && (
            <PreviewStep
              bookTitle={bookTitle}
              bookAuthor={bookAuthor}
              pdfFile={pdfFile}
              coverFile={coverFile}
              coverPreview={coverPreview}
              isConverting={isConverting}
              conversionProgress={conversionProgress}
              onBack={() => setCurrentStep("cover")}
              onConvert={simulateConversion}
            />
          )}

          {currentStep === "download" && (
            <DownloadStep bookTitle={bookTitle} onDownload={downloadEPUB} onReset={resetConverter} />
          )}
        </div>
      </div>
    </div>
  )
}

export default function EPUBConverter() {
  return (
    <ThemeProvider>
      <EPUBConverterContent />
    </ThemeProvider>
  )
}
