import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Clock, Download } from "lucide-react";
import ApprenticeUpsert from "@/components/apprentices/apprentice-upsert";

export default function ApprenticeDataIngestionPage() {

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

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Apprentice Data Ingestion</h1>
        <p className="text-gray-600 mt-2">Import and manage apprentice data from various sources</p>
      </div>

      <ApprenticeUpsert />

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
