"use client"

import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"
import {findTransactions} from "@/lib/transactionApiCalls"
import {Transaction, TransactionFind} from "@/types/transaction";


// for some reason had to deconstruct this here instead of inline due to type errors
interface TransactionSearchProps {
  setTransactionsState: React.Dispatch<React.SetStateAction<Transaction[]>>;
}


export function TransactionSearch({ setTransactionsState }: TransactionSearchProps) {
  const [transactionQuery, setTransactionQuery] = React.useState<TransactionFind>({
    fromDate: null,
    toDate: null,
    description: null,
  });

// function is triggered whenever the user changes the value
// in any of the input fields & updates transactionQuery
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value, type} = e.target;
    const processedValue = type === 'date' && value ? new Date(value) : (value || null);
    setTransactionQuery(prev => ({...prev, [name]: processedValue}));
  };

  // function is called when a user clicks the 'x' button on an active filter badge
  const clearFilter = (key: string) => {
    setTransactionQuery(prev => ({...prev, [key]: null}));
  };

  // function is linked to the "Clear All" button. It resets the entire
  // search form by setting all values in the state `transactionQuery`
  const clearAllFilters = () => {
    setTransactionQuery({
      fromDate: null,
      toDate: null,
      description: null
    });
  };

  // when the user clicks the "Search Transactions" button, it makes the API with the current `transactionQuery`
  // then updates the transactionsState in the Transactions page component
  const handleSearch = async () => {
    try {
      const transactions = await findTransactions(transactionQuery);
      setTransactionsState(transactions);
    } catch (error) {
      console.error("Error searching transactions:", error);
    }
  };

  // function checks which values in `transactionQuery` are not null
  // then returns an array of objects, where each object represents an active filter with its key and a user-friendly label
  const getActiveFilters = () => {
    const filters = []
    if (transactionQuery.fromDate)
      filters.push({ key: "fromDate", label: `From Date: ${transactionQuery.fromDate.toLocaleDateString()}` })
    if (transactionQuery.toDate)
      filters.push({ key: "toDate", label: `To Date: ${transactionQuery.toDate.toLocaleDateString()}` })
    if (transactionQuery.description)
      filters.push({ key: "description", label: `Description: ${transactionQuery.description}` })
    return filters
  }

  //AIing
  const formatDateForInput = (date: Date | null): string => {
    if (!date) {
      return "";
    }
    // Format the date to "YYYY-MM-DD"
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const activeFilters = getActiveFilters();

  return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Transaction Search
            </div>
            {activeFilters.length > 0 && (
                <Button variant="outline" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="from-date" className="block text-sm font-medium text-foreground/80 mb-1">
                From Date
              </label>
              <Input
                  id="from-date"
                  name="fromDate"
                  type="date"
                  value={formatDateForInput(transactionQuery.fromDate)}
                  onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="to-date" className="block text-sm font-medium text-foreground/80 mb-1">
                To Date
              </label>
              <Input
                  id="to-date"
                  name="toDate"
                  type="date"
                  value={formatDateForInput(transactionQuery.toDate)}
                  onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-foreground/80 mb-1">
                Description
              </label>
              <Input
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Search description..."
                  value={transactionQuery.description || ''}
                  onChange={handleInputChange}
              />
            </div>
          </div>
          {activeFilters.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter) => (
                    <Badge key={filter.key} variant="secondary" className="flex items-center gap-1">
                      {filter.label}
                      <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => clearFilter(filter.key)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                ))}
              </div>
          ) : (<div className="h-5"></div>) }

          <Button onClick={handleSearch} className="w-full md:w-auto">
            <Search className="mr-2 h-4 w-4" />
            Search Transactions
          </Button>

          {/* Debug - Remove in production */}
          <div className="p-3 bg-muted rounded text-xs">
            <strong>Query Object:</strong>
            <pre><code>{JSON.stringify(transactionQuery, null, 2)}</code></pre>
          </div>
        </CardContent>
      </Card>
  )
}