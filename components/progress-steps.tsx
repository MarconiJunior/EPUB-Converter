"use client"

import { Upload, FileText, ImageIcon, Download, Check } from "lucide-react"

type ConversionStep = "upload" | "cover" | "preview" | "download"

interface ProgressStepsProps {
  currentStep: ConversionStep
}

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
  const steps = [
    { step: "upload", label: "Upload PDF", icon: Upload },
    { step: "cover", label: "Escolher Capa", icon: ImageIcon },
    { step: "preview", label: "Preview", icon: FileText },
    { step: "download", label: "Download", icon: Download },
  ]

  return (
    <div className="flex items-center justify-center mb-12">
      <div className="flex items-center space-x-8">
        {steps.map(({ step, label, icon: Icon }, index) => {
          const isActive = currentStep === step
          const isCompleted = steps.findIndex((s) => s.step === currentStep) > index

          return (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 border-transparent text-white shadow-lg shadow-purple-500/25"
                      : isCompleted
                        ? "bg-gradient-to-r from-emerald-600 to-green-600 border-transparent text-white shadow-lg shadow-emerald-500/25"
                        : "bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-400 dark:text-slate-400 shadow-sm"
                  }`}
                >
                  {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <span
                  className={`mt-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-purple-600 dark:text-purple-400"
                      : isCompleted
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-0.5 mx-4 transition-colors ${
                    isCompleted ? "bg-gradient-to-r from-emerald-500 to-green-500" : "bg-slate-300 dark:bg-slate-600"
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
