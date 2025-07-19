"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"
import { findApprentices } from "@/lib/apprenticeApiCalls";
import { Apprentice, ApprenticeFind } from "@/types/apprentice"
import { Status, DirectorateCode, ApprenticeshipProgram } from "@/types/enums"

// For some reason had to deconstruct this here instead of inline due to type errors
interface ApprenticeSearchProps {
  setApprenticesState: React.Dispatch<React.SetStateAction<Apprentice[]>>
}

export function ApprenticeSearch({ setApprenticesState }: ApprenticeSearchProps) {
  const [apprenticeQuery, setApprenticeQuery] = React.useState<ApprenticeFind>({
    startDate: null,
    status: null,
    directorate: null,
    apprenticeProgram: null,
  })

  // Function is triggered whenever the user changes the value
  // in any of the input fields & updates apprenticeQuery
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    const processedValue = type === 'date' && value ? new Date(value) : (value || null)
    setApprenticeQuery(prev => ({ ...prev, [name]: processedValue }))
  }

  // Function handles select dropdown changes
  const handleSelectChange = (name: keyof ApprenticeFind, value: string) => {
    const processedValue = value === "all" ? null : value
    setApprenticeQuery(prev => ({ ...prev, [name]: processedValue }))
  }

  // Function is called when a user clicks the 'x' button on an active filter badge
  const clearFilter = (key: string) => {
    setApprenticeQuery(prev => ({ ...prev, [key]: null }))
  }

  // Function is linked to the "Clear All" button. It resets the entire
  // search form by setting all values in the state `apprenticeQuery`
  const clearAllFilters = () => {
    setApprenticeQuery({
      startDate: null,
      status: null,
      directorate: null,
      apprenticeProgram: null
    })
  }

  // When the user clicks the "Search Apprentices" button, it makes the API with the current `apprenticeQuery`
  // then updates the apprenticesState in the Apprentices page component
  const handleSearch = async () => {
    try {
      const apprentices = await findApprentices(apprenticeQuery)
      setApprenticesState(apprentices)
    } catch (error) {
      console.error("Error searching apprentices:", error)
    }
  }

  // Function checks which values in `apprenticeQuery` are not null
  // then returns an array of objects, where each object represents an active filter with its key and a user-friendly label
  const getActiveFilters = () => {
    const filters = []
    if (apprenticeQuery.startDate)
      filters.push({ key: "startDate", label: `Start Date: ${apprenticeQuery.startDate.toLocaleDateString()}` })
    if (apprenticeQuery.status)
      filters.push({ key: "status", label: `Status: ${apprenticeQuery.status}` })
    if (apprenticeQuery.directorate)
      filters.push({ key: "directorate", label: `Directorate: ${apprenticeQuery.directorate}` })
    if (apprenticeQuery.apprenticeProgram)
      filters.push({ key: "apprenticeProgram", label: `Program: ${apprenticeQuery.apprenticeProgram}` })
    return filters
  }

  const activeFilters = getActiveFilters()

  // Had to ask AI for help with this as I kept getting an error when I was trying to display the apprenticeQuery data
  // in the value property of the inputs
  const formatDateForInput = (date: Date | null) => {
    if (!date) return ''
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${date.getFullYear()}-${month}-${day}`
  }

  return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Apprentice Search
            </div>
            {activeFilters.length > 0 && (
                <Button variant="outline" size="sm" onClick={clearAllFilters}>
                  Clear All
                </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="start-date" className="block text-sm font-medium text-foreground/80 mb-1">
                Start Date
              </label>
              <Input
                  id="start-date"
                  name="startDate"
                  type="date"
                  value={formatDateForInput(apprenticeQuery.startDate)}
                  onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-foreground/80 mb-1">
                Status
              </label>
              <Select
                  value={apprenticeQuery.status || "all"}
                  onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value={Status.Break}>Break</SelectItem>
                  <SelectItem value={Status.Completed}>Completed</SelectItem>
                  <SelectItem value={Status.Live}>Live</SelectItem>
                  <SelectItem value={Status.Paused}>Paused</SelectItem>
                  <SelectItem value={Status.Stopped}>Stopped</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="directorate" className="block text-sm font-medium text-foreground/80 mb-1">
                Directorate
              </label>
              <Select
                  value={apprenticeQuery.directorate || "all"}
                  onValueChange={(value) => handleSelectChange("directorate", value)}
              >
                <SelectTrigger id="directorate">
                  <SelectValue placeholder="All Directorates" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Directorates</SelectItem>
                  <SelectItem value={DirectorateCode.AHI}>AHI</SelectItem>
                  <SelectItem value={DirectorateCode.CEx}>CEx</SelectItem>
                  <SelectItem value={DirectorateCode.CFS}>CFS</SelectItem>
                  <SelectItem value={DirectorateCode.CHE}>CHE</SelectItem>
                  <SelectItem value={DirectorateCode.Education}>Education</SelectItem>
                  <SelectItem value={DirectorateCode.FandR}>F & R</SelectItem>
                  <SelectItem value={DirectorateCode.School}>School</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="program" className="block text-sm font-medium text-foreground/80 mb-1">
                Program
              </label>
              <Select
                  value={apprenticeQuery.apprenticeProgram || "all"}
                  onValueChange={(value) => handleSelectChange("apprenticeProgram", value)}
              >
                <SelectTrigger id="program">
                  <SelectValue placeholder="All Programs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  <SelectItem value={ApprenticeshipProgram.Cdq}>Cdq</SelectItem>
                  <SelectItem value={ApprenticeshipProgram.NewRecruit}>New Recruit</SelectItem>
                  <SelectItem value={ApprenticeshipProgram.SchoolCdq}>School Cdq</SelectItem>
                  <SelectItem value={ApprenticeshipProgram.SchoolNewrecruit}>School New recruit</SelectItem>
                </SelectContent>
              </Select>
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
          ) : (
              <div className="h-5"></div>
          )}

          <Button onClick={handleSearch} className="w-full md:w-auto">
            <Search className="mr-2 h-4 w-4" />
            Search Apprentices
          </Button>

          {/* Debug - Remove in production */}
          <div className="p-3 bg-muted rounded text-xs">
            <strong>Query Object:</strong>
            <pre><code>{JSON.stringify(apprenticeQuery, null, 2)}</code></pre>
          </div>
        </CardContent>
      </Card>
  )
}