"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { MoreHorizontal, ArrowUpDown, Eye, Edit, Download, ChevronLeft, ChevronRight } from "lucide-react"
import { TransactionDetailModal } from "./transaction-detail-modal"
import type { Transaction, TransactionCreate } from "@/types/transaction"
import {updateTransaction} from "@/lib/fetch-calls";


interface TransactionTableProps {
  transactions: Transaction[]
}

export function TransactionTable({transactions}: TransactionTableProps) {
  const [sortField, setSortField] = useState<keyof Transaction>("transactionDate")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 50
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const handleRowClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsPanelOpen(true)
  }

  const handleUpdateTransaction = async (utransaction: TransactionCreate) => {
    try {
      const updatingTransaction = await updateTransaction(utransaction);
      console.log("Saving transaction:", updatingTransaction)
      setIsPanelOpen(false)
    } catch (e) {
      console.log('Failed to create transaction');
    }
  }

  const handleClosePanel = () => {
    setIsPanelOpen(false)
    setSelectedTransaction(null)
  }

  const sortedTransactions = transactions.sort((a, b) => {
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

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTransactions = sortedTransactions.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (field: keyof Transaction) => {
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
    <Card>
      <CardHeader>
        <CardTitle>Transactions ({transactions.length} total)</CardTitle>
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
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("transactionDate")}
                    className="h-auto p-0 font-semibold"
                  >
                    Transaction Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("transactionType")}
                    className="h-auto p-0 font-semibold"
                  >
                    Transaction Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Description</TableHead>
                <TableHead>PAYE Scheme</TableHead>
                <TableHead>ULN</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTransactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => handleRowClick(transaction)}
                >
                  <TableCell className="font-medium font-mono">{transaction.id}</TableCell>
                  <TableCell>{new Date(transaction.transactionDate).toLocaleDateString()}</TableCell>
                  <TableCell>{transaction.transactionType}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-help">{truncateText(transaction.description)}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">{transaction.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{transaction.payeScheme}</TableCell>
                  <TableCell className="font-mono text-sm">{transaction.uln}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => handleRowClick(transaction)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Transaction
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Export Data
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, transactions.length)} of{" "}
            {transactions.length} results
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
            <div className="text-sm">
              Page {currentPage} of {totalPages}
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
        <TransactionDetailModal
          transaction={selectedTransaction}
          isOpen={isPanelOpen}
          onClose={handleClosePanel}
          onSave={handleUpdateTransaction}
        />
      </CardContent>
    </Card>
  )
}