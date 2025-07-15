import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function TransactionsLoading() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-5 w-72 mt-2" />
        </div>
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>

      {/* Search Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-44" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-8 w-24" />
          </div>
        </CardHeader>
        <CardContent>
          {/* Table Header */}
          <div className="grid grid-cols-7 gap-4 pb-4 border-b">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Table Rows */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="grid grid-cols-7 gap-4 py-4 border-b">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-8 w-8 rounded" />
            </div>
          ))}

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4">
            <Skeleton className="h-4 w-32" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
