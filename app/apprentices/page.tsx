'use client'

import React from "react"
import { ApprenticeSearch } from "@/components/apprentices/apprentice-search"
import { ApprenticeTable } from "@/components/apprentices/apprentice-table"
import { getAllApprentices, createApprentice } from "@/lib/apprenticeApiCalls";
import { ApprenticeCreateModal } from "@/components/apprentices/apprentice-create-modal";
import type { Apprentice, ApprenticeCreate } from "@/types/apprentice"
import { Button } from "@/components/ui/button"
import { Download, Plus } from "lucide-react"

export default function ApprenticesPage() {
  const [isCreateModalOpen, setCreateModalOpen] = React.useState(false)
  const [apprenticesState, setApprenticesState] = React.useState<Apprentice[]>([])

  React.useEffect(() => {
    const initialApprenticeLoad = async () => {
      try {
        const iapprentice = await getAllApprentices()
        setApprenticesState(iapprentice)
      } catch (e) {
        console.log(e.message, "error message")
      }
    }

    initialApprenticeLoad()
  }, [])

  // Handle function for creating new apprentice
  const handleCreateApprentice = async (userAddedApprentice: ApprenticeCreate) => {
    await createApprentice(userAddedApprentice)
    setCreateModalOpen(false)
  }

  return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center p-2">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Apprentices</h1>
            <p className="text-muted-foreground mt-2">Manage and view all apprentice records</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setCreateModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Apprentice
            </Button>
            <Button onClick={() => console.log(apprenticesState, "exporting apprentices")} className="primary">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        <ApprenticeSearch setApprenticesState={setApprenticesState} />
        <ApprenticeTable apprentices={apprenticesState} />

        {/* The modal is controlled by this client component */}
        <ApprenticeCreateModal
            isOpen={isCreateModalOpen}
            onClose={() => setCreateModalOpen(false)}
            handleCreateApprentice={handleCreateApprentice}
        />
      </div>
  )
}