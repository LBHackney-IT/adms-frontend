"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Activity, AlertCircle, CheckCircle, Info, Download, Filter, Clock, XCircle } from "lucide-react"
import { AuditLogStatus, EventType } from "@/types/enums"
import type { AuditLog } from "@/types/auditlog"

// Mock data - in real app this would come from API
const mockLogs: AuditLog[] = [
  {
    id: "1",
    eventType: EventType.DataIngestion,
    eventTypeTargetId: "apprentice_data_jan_2024.csv",
    status: AuditLogStatus.Success,
    details: {
      message: 'CSV file "apprentice_data_jan_2024.csv" imported successfully',
      recordsProcessed: 156,
      errors: 0,
    },
    createdAt: new Date("2024-01-07T10:30:15Z"),
    userId: "system",
  },
  {
    id: "2",
    eventType: EventType.ApprenticeUpdated,
    eventTypeTargetId: "APP001",
    status: AuditLogStatus.Success,
    details: {
      message: "Apprentice record updated",
      changes: { status: { from: "Live", to: "Completed" } },
      updatedBy: "john.doe@hackney.gov.uk",
    },
    createdAt: new Date("2024-01-07T10:25:42Z"),
    userId: "john.doe@hackney.gov.uk",
  },
  {
    id: "3",
    eventType: EventType.DataIngestion,
    eventTypeTargetId: "google_sheets_sync",
    status: AuditLogStatus.Success,
    details: {
      message: "Google Sheets synchronization completed",
      recordsSynchronized: 89,
      source: "Apprentice Data sheet",
    },
    createdAt: new Date("2024-01-07T09:15:33Z"),
    userId: "system",
  },
  {
    id: "4",
    eventType: EventType.DataIngestion,
    eventTypeTargetId: "doe_api_sync",
    status: AuditLogStatus.Failure,
    details: {
      message: "Department of Education API sync failed",
      error: "Connection timeout after 30 seconds",
      retryScheduled: true,
    },
    createdAt: new Date("2024-01-07T08:45:12Z"),
    userId: "system",
  },
  {
    id: "5",
    eventType: EventType.ValidationError,
    eventTypeTargetId: "invalid_data.csv",
    status: AuditLogStatus.Failure,
    details: {
      message: "CSV import validation failed",
      errors: ["Missing required fields in rows 5, 12, 18"],
      fileName: "invalid_data.csv",
    },
    createdAt: new Date("2024-01-07T08:00:05Z"),
    userId: "system",
  },
  {
    id: "6",
    eventType: EventType.TransactionAdded,
    eventTypeTargetId: "TXN001",
    status: AuditLogStatus.InProgress,
    details: {
      message: "Transaction record creation in progress",
      transactionId: "TXN001",
    },
    createdAt: new Date("2024-01-07T07:30:22Z"),
    userId: "jane.smith@hackney.gov.uk",
  },
  {
    id: "7",
    eventType: EventType.ApprenticeAdded,
    eventTypeTargetId: "APP002",
    status: AuditLogStatus.Success,
    details: {
      message: "New apprentice record created",
      apprenticeId: "APP002",
      createdBy: "admin@hackney.gov.uk",
    },
    createdAt: new Date("2024-01-06T16:20:10Z"),
    userId: "admin@hackney.gov.uk",
  },
  {
    id: "8",
    eventType: EventType.TransactionDeleted,
    eventTypeTargetId: "TXN999",
    status: AuditLogStatus.Skipped,
    details: {
      message: "Transaction deletion skipped - record not found",
      transactionId: "TXN999",
    },
    createdAt: new Date("2024-01-06T14:15:30Z"),
    userId: "system",
  },
]

export default function LogsPage() {
  const [fromDate, setFromDate] = useState<string>("")
  const [toDate, setToDate] = useState<string>("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")

  // Filter logs based on current filter state
  const filteredLogs = useMemo(() => {
    return mockLogs.filter((log) => {
      // Date filtering
      if (fromDate) {
        const logDate = new Date(log.createdAt)
        const filterFromDate = new Date(fromDate)
        if (logDate < filterFromDate) return false
      }

      if (toDate) {
        const logDate = new Date(log.createdAt)
        const filterToDate = new Date(toDate)
        // Set to end of day for toDate
        filterToDate.setHours(23, 59, 59, 999)
        if (logDate > filterToDate) return false
      }

      // Status filtering
      if (selectedStatus !== "all" && log.status !== selectedStatus) {
        return false
      }

      // Type filtering
      if (selectedType !== "all" && log.eventType !== selectedType) {
        return false
      }

      return true
    })
  }, [fromDate, toDate, selectedStatus, selectedType])

  const getLogIcon = (status: AuditLogStatus) => {
    switch (status) {
      case AuditLogStatus.Success:
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case AuditLogStatus.Failure:
        return <XCircle className="h-4 w-4 text-destructive" />
      case AuditLogStatus.InProgress:
        return <Clock className="h-4 w-4 text-blue-500" />
      case AuditLogStatus.Skipped:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <Info className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getLogBadge = (status: AuditLogStatus) => {
    switch (status) {
      case AuditLogStatus.Success:
        return <Badge className="bg-green-100 text-green-800">Success</Badge>
      case AuditLogStatus.Failure:
        return <Badge variant="destructive">Failure</Badge>
      case AuditLogStatus.InProgress:
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case AuditLogStatus.Skipped:
        return <Badge className="bg-yellow-100 text-yellow-800">Skipped</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const formatEventType = (eventType: EventType) => {
    const eventTypeString = String(eventType)
    switch (eventType) {
      case EventType.DataIngestion:
        return "Data Ingestion"
      case EventType.ValidationError:
        return "Validation Error"
      case EventType.ApprenticeAdded:
        return "Apprentice Added"
      case EventType.ApprenticeUpdated:
        return "Apprentice Updated"
      case EventType.ApprenticeDeleted:
        return "Apprentice Deleted"
      case EventType.TransactionAdded:
        return "Transaction Added"
      case EventType.TransactionUpdated:
        return "Transaction Updated"
      case EventType.TransactionDeleted:
        return "Transaction Deleted"
      default:
        return eventTypeString.replace(/([A-Z])/g, " $1").trim()
    }
  }

  const clearFilters = () => {
    setFromDate("")
    setToDate("")
    setSelectedStatus("all")
    setSelectedType("all")
  }

  const hasActiveFilters = fromDate || toDate || selectedStatus !== "all" || selectedType !== "all"

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Activity Logs</h1>
          <p className="text-muted-foreground mt-2">Monitor system activities and troubleshoot issues</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Filter Logs
            </div>
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="from-date" className="block text-sm font-medium text-foreground/80 mb-1">
                From Date
              </label>
              <Input
                id="from-date"
                type="date"
                className="w-full"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="to-date" className="block text-sm font-medium text-foreground/80 mb-1">
                To Date
              </label>
              <Input
                id="to-date"
                type="date"
                className="w-full"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="log-status" className="block text-sm font-medium text-foreground/80 mb-1">
                Log Status
              </label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger id="log-status">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value={AuditLogStatus.Success}>Success</SelectItem>
                  <SelectItem value={AuditLogStatus.Failure}>Failure</SelectItem>
                  <SelectItem value={AuditLogStatus.InProgress}>In Progress</SelectItem>
                  <SelectItem value={AuditLogStatus.Skipped}>Skipped</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="log-type" className="block text-sm font-medium text-foreground/80 mb-1">
                Log Type
              </label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger id="log-type">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value={EventType.DataIngestion}>Data Ingestion</SelectItem>
                  <SelectItem value={EventType.ValidationError}>Validation Error</SelectItem>
                  <SelectItem value={EventType.ApprenticeAdded}>Apprentice Added</SelectItem>
                  <SelectItem value={EventType.ApprenticeUpdated}>Apprentice Updated</SelectItem>
                  <SelectItem value={EventType.ApprenticeDeleted}>Apprentice Deleted</SelectItem>
                  <SelectItem value={EventType.TransactionAdded}>Transaction Added</SelectItem>
                  <SelectItem value={EventType.TransactionUpdated}>Transaction Updated</SelectItem>
                  <SelectItem value={EventType.TransactionDeleted}>Transaction Deleted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                Showing {filteredLogs.length} of {mockLogs.length} logs
                {fromDate && ` • From: ${new Date(fromDate).toLocaleDateString()}`}
                {toDate && ` • To: ${new Date(toDate).toLocaleDateString()}`}
                {selectedStatus !== "all" && ` • Status: ${selectedStatus}`}
                {selectedType !== "all" && ` • Type: ${formatEventType(selectedType as EventType)}`}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            {hasActiveFilters
              ? `Filtered results (${filteredLogs.length} logs)`
              : `Latest system logs and activities (${filteredLogs.length} logs)`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredLogs.length === 0 ? (
            <div className="text-center py-8">
              <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No logs found</h3>
              <p className="text-muted-foreground">
                {hasActiveFilters
                  ? "Try adjusting your filters to see more results."
                  : "No activity logs are available at this time."}
              </p>
              {hasActiveFilters && (
                <Button variant="outline" className="mt-4 bg-transparent" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLogs.map((log) => (
                <div key={log.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getLogIcon(log.status)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-foreground">{log.details.message}</span>
                          {getLogBadge(log.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Target: {log.eventTypeTargetId}
                          {log.details.recordsProcessed && ` • ${log.details.recordsProcessed} records processed`}
                          {log.details.errors !== undefined && ` • ${log.details.errors} errors`}
                          {log.details.error && ` • Error: ${log.details.error}`}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{log.createdAt.toLocaleString()}</span>
                          <span>•</span>
                          <span>{formatEventType(log.eventType)}</span>
                          <span>•</span>
                          <span>User: {log.userId || "system"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
