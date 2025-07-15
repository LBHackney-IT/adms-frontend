"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, Database, CheckCircle, AlertCircle, Clock, RefreshCw, Download } from "lucide-react"

export default function ApprenticeDataIngestionPage() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const recentImports = [
    {
      id: 1,
      filename: "apprentice_data_jan_2024.csv",
      timestamp: "2024-01-07 10:30 AM",
      status: "completed",
      records: 156,
      errors: 0,
    },
    {
      id: 2,
      filename: "apprentice_updates_dec_2023.csv",
      timestamp: "2024-01-06 14:22 PM",
      status: "completed",
      records: 89,
      errors: 2,
    },
    {
      id: 3,
      filename: "new_apprentices_dec_2023.csv",
      timestamp: "2024-01-05 11:15 AM",
      status: "failed",
      records: 0,
      errors: 15,
    },
  ]

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "failed":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Success</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Apprentice Data Ingestion</h1>
        <p className="text-gray-600 mt-2">Import and manage apprentice data from various sources</p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="mr-2 h-5 w-5" />
            Upload Apprentice CSV File
          </CardTitle>
          <CardDescription>Upload a CSV file containing apprentice data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Drop apprentice files here or click to upload
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

      {/* Recent Imports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Apprentice Imports</CardTitle>
          <CardDescription>View the history of recent apprentice data imports and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentImports.map((import_) => (
              <div key={import_.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(import_.status)}
                  <div>
                    <h3 className="font-medium text-gray-900">{import_.filename}</h3>
                    <p className="text-sm text-gray-500">{import_.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{import_.records} records processed</p>
                    {import_.errors > 0 && <p className="text-sm text-red-600">{import_.errors} errors</p>}
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
