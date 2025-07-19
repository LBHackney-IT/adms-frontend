"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { MoreHorizontal, ArrowUpDown, Eye, Edit, Download, ChevronLeft, ChevronRight } from "lucide-react"
import { ApprenticeDetailModal } from "./apprentice-detail-modal"
import type { Apprentice, ApprenticeUpdate } from "@/types/apprentice"
import {updateApprentice} from "@/lib/apprenticeApiCalls";


interface ApprenticeTableProps {
  apprentices: Apprentice[]
}

export function ApprenticeTable({ apprentices }: ApprenticeTableProps) {
  const [sortField, setSortField] = useState<keyof Apprentice>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 50
  const [selectedApprentice, setSelectedApprentice] = useState<Apprentice | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const handleRowClick = (apprentice: Apprentice) => {
    setSelectedApprentice(apprentice)
    setIsPanelOpen(true)
  }

  const handleUpdateApprentice = async (updatedApprentice: ApprenticeUpdate) => {
    try {
      const updatingApprentice = await updateApprentice(updatedApprentice)
      console.log("Saving apprentice:", updatingApprentice)
      setIsPanelOpen(false)
    } catch (e) {
      console.log('Failed to update apprentice')
    }
  }

  const handleClosePanel = () => {
    setIsPanelOpen(false)
    setSelectedApprentice(null)
  }

  const sortedApprentices = apprentices.sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    if (aValue === null || aValue === undefined) return sortDirection === "asc" ? -1 : 1
    if (bValue === null || bValue === undefined) return sortDirection === "asc" ? 1 : -1
    if (aValue instanceof Date && bValue instanceof Date) {
      return sortDirection === "asc" ? aValue.getTime() - bValue.getTime() : bValue.getTime() - aValue.getTime()
    }
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }
    if (sortDirection === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  const totalPages = Math.ceil(sortedApprentices.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedApprentices = sortedApprentices.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (field: keyof Apprentice) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const truncateText = (text: string, maxLength = 50) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
  }

  return (
      <TooltipProvider>
        <Card>
          <CardHeader>
            <CardTitle>Apprentices ({apprentices.length} total)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("id")} className="h-auto p-0 font-semibold">
                        ID
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("name")} className="h-auto p-0 font-semibold">
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("startDate")} className="h-auto p-0 font-semibold">
                        Start Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("status")} className="h-auto p-0 font-semibold">
                        Status
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("directorate")} className="h-auto p-0 font-semibold">
                        Directorate
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("apprenticeProgram")} className="h-auto p-0 font-semibold">
                        Program
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("trainingProvider")} className="h-auto p-0 font-semibold">
                        Training Provider
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("uln")} className="h-auto p-0 font-semibold">
                        ULN
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button variant="ghost" onClick={() => handleSort("totalAgreedApprenticeshipPrice")} className="h-auto p-0 font-semibold">
                        Total Price
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedApprentices.map((apprentice) => (
                      <TableRow
                          key={apprentice.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => handleRowClick(apprentice)}
                      >
                        <TableCell className="font-mono text-sm">
                          <Tooltip>
                            <TooltipTrigger>
                              {apprentice.id.substring(0, 8)}...
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{apprentice.id}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="font-medium">
                          <Tooltip>
                            <TooltipTrigger>
                              {truncateText(apprentice.name, 30)}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{apprentice.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell>{new Date(apprentice.startDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                            <p>{apprentice.status}</p>
                        </TableCell>
                        <TableCell>
                          <p>{apprentice.directorate}</p>
                        </TableCell>
                        <TableCell>
                          <p>{apprentice.apprenticeProgram}</p>
                        </TableCell>
                        <TableCell>
                          <Tooltip>
                            <TooltipTrigger>
                              {apprentice.trainingProvider ? truncateText(apprentice.trainingProvider, 25) : "Not specified"}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{apprentice.trainingProvider || "Not specified"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{apprentice.uln}</TableCell>
                        <TableCell className="text-right">
                          £{apprentice.totalAgreedApprenticeshipPrice.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleRowClick(apprentice)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleRowClick(apprentice)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Export
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between space-x-2 py-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedApprentices.length)} of{" "}
                {sortedApprentices.length} apprentices
              </div>
              <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="flex items-center space-x-1">
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detail Modal */}
        <ApprenticeDetailModal
            apprentice={selectedApprentice}
            isOpen={isPanelOpen}
            onClose={handleClosePanel}
            onSave={handleUpdateApprentice}
        />
      </TooltipProvider>
  )
}