"use client"

import React from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Upload} from "lucide-react";
import {Progress} from "@/components/ui/progress";


export default function TransactionUpsert() {
    const [uploadProgress, setUploadProgress] = React.useState(0)
    const [isUploading, setIsUploading] = React.useState(false)

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setIsUploading(true)
            setUploadProgress(0)

            // Simulate upload progress
            const interval = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval)
                        setIsUploading(false)
                        return 100
                    }
                    return prev + 10
                })
            }, 200)
        }
    }

    const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
    }

  return(
          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center">
                      <Upload className="mr-2 h-5 w-5" />
                      Upload Transaction CSV File
                  </CardTitle>
                  <CardDescription>Upload a CSV file containing transaction data</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                          <label htmlFor="file-upload" className="cursor-pointer">
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Drop transaction files here or click to upload
                </span>
                              <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  accept=".csv"
                                  className="sr-only"
                                  onChange={handleFileUpload}
                              />
                          </label>
                          <p className="mt-1 text-xs text-gray-500">CSV files up to 10MB</p>
                      </div>
                  </div>

                  {isUploading && (
                      <div className="mt-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                              <span>Uploading...</span>
                              <span>{uploadProgress}%</span>
                          </div>
                          <Progress value={uploadProgress} className="w-full" />
                      </div>
                  )}
              </CardContent>
          </Card>
  )
}