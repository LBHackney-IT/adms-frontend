"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Save, AlertCircle, Hash, ExternalLink } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { TransactionDetailModal } from "@/components/transactions/transaction-detail-modal"
import type { Apprentice, ApprenticeUpdate } from "@/types/apprentice"
import type {Transaction, TransactionUpdate} from "@/types/transaction"
import { updateTransaction } from "@/lib/transactionApiCalls"
import {
  Status,
  DirectorateCode,
  ApprenticeshipProgram,
  Gender,
  Ethnicity,
  Achievement,
  Classification,
  CertificateStatus,
  ProgressionTracker,
  NonCompletionReason,
} from "@/types/enums"

interface ApprenticeDetailPanelProps {
  apprentice: Apprentice | null
  isOpen: boolean
  onClose: () => void
  onSave: (apprentice: ApprenticeUpdate) => void
}

export function ApprenticeDetailModal({ apprentice, isOpen, onClose, onSave }: ApprenticeDetailPanelProps) {
  const [formData, setFormData] = React.useState<ApprenticeUpdate | null>(null)
  const [isEditing, setIsEditing] = React.useState(false)
  const [hasChanges, setHasChanges] = React.useState(false)
  const [selectedTransaction, setSelectedTransaction] = React.useState<Transaction | null>(null)
  const [isTransactionPanelOpen, setIsTransactionPanelOpen] = React.useState(false)

  React.useEffect(() => {
    if (apprentice) {
      // Convert Apprentice to ApprenticeUpdate for editing
      const apprenticeUpdate: ApprenticeUpdate = {
        id: apprentice.id,
        name: apprentice.name,
        startDate: apprentice.startDate,
        status: apprentice.status,
        uln: apprentice.uln,
        createdAt: apprentice.createdAt,
        dateOfBirth: apprentice.dateOfBirth,
        apprenticeAchievement: apprentice.apprenticeAchievement,
        apprenticeConfirmation: apprentice.apprenticeConfirmation,
        apprenticeClassification: apprentice.apprenticeClassification,
        apprenticeEthnicity: apprentice.apprenticeEthnicity,
        apprenticeGender: apprentice.apprenticeGender,
        apprenticeNonCompletionReason: apprentice.apprenticeNonCompletionReason,
        apprenticeProgram: apprentice.apprenticeProgram,
        apprenticeProgression: apprentice.apprenticeProgression,
        apprenticeshipDelivery: apprentice.apprenticeshipDelivery,
        certificatesReceived: apprentice.certificatesReceived,
        completionDate: apprentice.completionDate,
        directorate: apprentice.directorate,
        doeReference: apprentice.doeReference,
        employeeNumber: apprentice.employeeNumber,
        endDate: apprentice.endDate,
        endPointAssessor: apprentice.endPointAssessor,
        isCareLeaver: apprentice.isCareLeaver,
        isDisabled: apprentice.isDisabled,
        managerName: apprentice.managerName,
        managerTitle: apprentice.managerTitle,
        pauseDate: apprentice.pauseDate,
        post: apprentice.post,
        school: apprentice.school,
        totalAgreedApprenticeshipPrice: apprentice.totalAgreedApprenticeshipPrice,
        trainingCourse: apprentice.trainingCourse,
        trainingProvider: apprentice.trainingProvider,
        ukprn: apprentice.ukprn,
        withdrawalDate: apprentice.withdrawalDate,
      }
      setFormData(apprenticeUpdate)
      setIsEditing(false)
      setHasChanges(false)
    }
  }, [apprentice])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return

    const { name, value, type } = e.target
    const processedValue = type === 'date' && value ? new Date(value) : (value || null)
    setFormData(prev => prev ? { ...prev, [name]: processedValue } : null)
    setHasChanges(true)
  }

  const handleSelectChange = (name: string, value: string) => {
    if (!formData) return

    const processedValue = value === "NotSpecified" ? null : value
    setFormData(prev => prev ? { ...prev, [name]: processedValue } : null)
    setHasChanges(true)
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    if (!formData) return

    setFormData(prev => prev ? { ...prev, [name]: checked } : null)
    setHasChanges(true)
  }

  // Reset form data from the original apprentice
  const handleCancel = () => {
    if (apprentice) {
      const apprenticeUpdate: ApprenticeUpdate = {
        id: apprentice.id,
        name: apprentice.name,
        startDate: apprentice.startDate,
        status: apprentice.status,
        uln: apprentice.uln,
        createdAt: apprentice.createdAt,
        dateOfBirth: apprentice.dateOfBirth,
        apprenticeAchievement: apprentice.apprenticeAchievement,
        apprenticeConfirmation: apprentice.apprenticeConfirmation,
        apprenticeClassification: apprentice.apprenticeClassification,
        apprenticeEthnicity: apprentice.apprenticeEthnicity,
        apprenticeGender: apprentice.apprenticeGender,
        apprenticeNonCompletionReason: apprentice.apprenticeNonCompletionReason,
        apprenticeProgram: apprentice.apprenticeProgram,
        apprenticeProgression: apprentice.apprenticeProgression,
        apprenticeshipDelivery: apprentice.apprenticeshipDelivery,
        certificatesReceived: apprentice.certificatesReceived,
        completionDate: apprentice.completionDate,
        directorate: apprentice.directorate,
        doeReference: apprentice.doeReference,
        employeeNumber: apprentice.employeeNumber,
        endDate: apprentice.endDate,
        endPointAssessor: apprentice.endPointAssessor,
        isCareLeaver: apprentice.isCareLeaver,
        isDisabled: apprentice.isDisabled,
        managerName: apprentice.managerName,
        managerTitle: apprentice.managerTitle,
        pauseDate: apprentice.pauseDate,
        post: apprentice.post,
        school: apprentice.school,
        totalAgreedApprenticeshipPrice: apprentice.totalAgreedApprenticeshipPrice,
        trainingCourse: apprentice.trainingCourse,
        trainingProvider: apprentice.trainingProvider,
        ukprn: apprentice.ukprn,
        withdrawalDate: apprentice.withdrawalDate,
      }
      setFormData(apprenticeUpdate)
      setIsEditing(false)
      setHasChanges(false)
    }
  }

  const handleUpdateApprentice = () => {
    if (formData && hasChanges) {
      try {
        onSave(formData)
        setIsEditing(false)
        setHasChanges(false)
      } catch (err) {
        console.log((err as Error).message || 'Failed to update apprentice')
      }
    }
  }

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsTransactionPanelOpen(true)
  }

  const handleTransactionSave = async (updatedTransaction: TransactionUpdate) => {
    if (updatedTransaction) {
      try {
        await updateTransaction(updatedTransaction);
        // Optionally, refresh the apprentice data to reflect the updated transaction
        // This might involve calling a prop function passed from the parent component
        // or re-fetching the apprentice data. For now, we'll just close the panel.
        setIsTransactionPanelOpen(false);
        setSelectedTransaction(null);
      } catch (error) {
        console.error("Failed to update transaction:", error);
        // Handle error, e.g., show a toast notification
      }
    }
  }

  if (!formData || !apprentice) return null

  return (
      <>
        <Sheet open={isOpen} onOpenChange={onClose}>
          <SheetContent side="right" className="h-full w-1/2">
            <div className="flex flex-col h-full">
              <SheetHeader>
                <div className="flex items-center justify-between">
                  <div className="pl-3 mb-[-24px]">
                    <SheetTitle className="flex items-center gap-2">
                      <Hash className="h-5 w-5" />
                      Apprentice Details - {apprentice.id}
                    </SheetTitle>
                    <SheetDescription>{apprentice.name}</SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto p-6">
                {hasChanges && (
                    <Alert className="mb-6">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>You have unsaved changes</AlertDescription>
                    </Alert>
                )}

                <div className="space-y-6">
                  {/* Personal Details Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Details</CardTitle>
                      <CardDescription>Basic personal information and demographics</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="id">Apprentice ID</Label>
                          <div className="p-2 bg-gray-200 rounded font-mono text-sm">{apprentice.id}</div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          {isEditing ? (
                              <Input
                                  id="name"
                                  name="name"
                                  value={formData.name}
                                  onChange={handleInputChange}
                              />
                          ) : (
                              <div className="p-2 bg-gray-50 rounded font-semibold">
                                {apprentice.name}
                              </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dateOfBirth">Date of Birth</Label>
                          {isEditing ? (
                              <Input
                                  id="dateOfBirth"
                                  name="dateOfBirth"
                                  type="date"
                                  value={formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString().split("T")[0] : ""}
                                  onChange={handleInputChange}
                              />
                          ) : (
                              <div className="p-2 bg-gray-50 rounded">
                                {new Date(apprentice.dateOfBirth).toLocaleDateString()}
                              </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="apprenticeEthnicity">Ethnicity</Label>
                          {isEditing ? (
                              <Select
                                  value={formData.apprenticeEthnicity || "NotSpecified"}
                                  onValueChange={(value) => handleSelectChange("apprenticeEthnicity", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select ethnicity" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="NotSpecified">Not specified</SelectItem>
                                  {Object.values(Ethnicity).map((ethnicity) => (
                                      <SelectItem key={ethnicity} value={ethnicity}>
                                        {ethnicity}
                                      </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                          ) : (
                              <div className="p-2 bg-gray-50 rounded">{apprentice.apprenticeEthnicity || "Not specified"}</div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="apprenticeGender">Gender</Label>
                          {isEditing ? (
                              <Select
                                  value={formData.apprenticeGender || "NotSpecified"}
                                  onValueChange={(value) => handleSelectChange("apprenticeGender", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="NotSpecified">Not specified</SelectItem>
                                  {Object.values(Gender).map((gender) => (
                                      <SelectItem key={gender} value={gender}>
                                        {gender}
                                      </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                          ) : (
                              <div className="p-2 bg-gray-50 rounded">{apprentice.apprenticeGender || "Not specified"}</div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            {isEditing ? (
                                <Checkbox
                                    id="isCareLeaver"
                                    checked={formData.isCareLeaver}
                                    onCheckedChange={(checked) => handleCheckboxChange("isCareLeaver", checked as boolean)}
                                />
                            ) : (
                                <div className="w-4 h-4 border rounded flex items-center justify-center">
                                  {apprentice.isCareLeaver && <div className="w-2 h-2 bg-primary rounded"></div>}
                                </div>
                            )}
                            <Label htmlFor="isCareLeaver">Care Leaver</Label>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            {isEditing ? (
                                <Checkbox
                                    id="isDisabled"
                                    checked={formData.isDisabled}
                                    onCheckedChange={(checked) => handleCheckboxChange("isDisabled", checked as boolean)}
                                />
                            ) : (
                                <div className="w-4 h-4 border rounded flex items-center justify-center">
                                  {apprentice.isDisabled && <div className="w-2 h-2 bg-primary rounded"></div>}
                                </div>
                            )}
                            <Label htmlFor="isDisabled">Disabled</Label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Employment Details Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Employment Details</CardTitle>
                      <CardDescription>Employment and management information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="employeeNumber">Employee Number</Label>
                          {isEditing ? (
                              <Input
                                  id="employeeNumber"
                                  name="employeeNumber"
                                  value={formData.employeeNumber ?? ""}
                                  onChange={handleInputChange}
                              />
                          ) : (
                              <div className="p-2 bg-gray-50 rounded font-mono text-sm">
                                {apprentice.employeeNumber || "Not specified"}
                              </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="post">Post</Label>
                          {isEditing ? (
                              <Input
                                  id="post"
                                  name="post"
                                  value={formData.post ?? ""}
                                  onChange={handleInputChange}
                              />
                          ) : (
                              <div className="p-2 bg-gray-50 rounded">{apprentice.post || "Not specified"}</div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="managerName">Manager Name</Label>
                          {isEditing ? (
                              <Input
                                  id="managerName"
                                  name="managerName"
                                  value={formData.managerName ?? ""}
                                  onChange={handleInputChange}
                              />
                          ) : (
                              <div className="p-2 bg-gray-50 rounded">{apprentice.managerName || "Not specified"}</div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="managerTitle">Manager Title</Label>
                          {isEditing ? (
                              <Input
                                  id="managerTitle"
                                  name="managerTitle"
                                  value={formData.managerTitle ?? ""}
                                  onChange={handleInputChange}
                              />
                          ) : (
                              <div className="p-2 bg-gray-50 rounded">{apprentice.managerTitle || "Not specified"}</div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="directorate">Directorate</Label>
                        {isEditing ? (
                            <Select
                                value={formData.directorate || "NotSpecified"}
                                onValueChange={(value) => handleSelectChange("directorate", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select directorate" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="NotSpecified">Not specified</SelectItem>
                                {Object.values(DirectorateCode).map((directorate) => (
                                    <SelectItem key={directorate} value={directorate}>
                                      {directorate}
                                    </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                        ) : (
                            <div className="p-2 bg-gray-50 rounded">{apprentice.directorate || "Not specified"}</div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Apprenticeship Details Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Apprenticeship Details</CardTitle>
                      <CardDescription>Training and apprenticeship program information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="uln">ULN</Label>
                          {isEditing ? (
                              <Input
                                  id="uln"
                                  name="uln"
                                  type="number"
                                  value={formData.uln}
                                  onChange={handleInputChange}
                              />
                          ) : (
                              <div className="p-2 bg-gray-50 rounded font-mono text-sm">{apprentice.uln}</div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="startDate">Start Date</Label>
                          {isEditing ? (
                              <Input
                                  id="startDate"
                                  name="startDate"
                                  type="date"
                                  value={formData.startDate ? new Date(formData.startDate).toISOString().split("T")[0] : ""}
                                  onChange={handleInputChange}
                              />
                          ) : (
                              <div className="p-2 bg-gray-50 rounded">
                                {new Date(apprentice.startDate).toLocaleDateString()}
                              </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          {isEditing ? (
                              <Select
                                  value={formData.status}
                                  onValueChange={(value) => handleSelectChange("status", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.values(Status).map((status) => (
                                      <SelectItem key={status} value={status}>
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                      </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                          ) : (
                              <div className="p-2 bg-gray-50 rounded">
                                {apprentice.status}
                              </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="trainingCourse">Training Course</Label>
                          {isEditing ? (
                              <Input
                                  id="trainingCourse"
                                  name="trainingCourse"
                                  value={formData.trainingCourse ?? ""}
                                  onChange={handleInputChange}
                              />
                          ) : (
                              <div className="p-2 bg-gray-50 rounded">{apprentice.trainingCourse || "Not specified"}</div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="trainingProvider">Training Provider</Label>
                          {isEditing ? (
                              <Input
                                  id="trainingProvider"
                                  name="trainingProvider"
                                  value={formData.trainingProvider ?? ""}
                                  onChange={handleInputChange}
                              />
                          ) : (
                              <div className="p-2 bg-gray-50 rounded">{apprentice.trainingProvider || "Not specified"}</div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="totalAgreedApprenticeshipPrice">Total Agreed Price</Label>
                          {isEditing ? (
                              <Input
                                  id="totalAgreedApprenticeshipPrice"
                                  name="totalAgreedApprenticeshipPrice"
                                  type="number"
                                  step="0.01"
                                  value={formData.totalAgreedApprenticeshipPrice}
                                  onChange={handleInputChange}
                              />
                          ) : (
                              <div className="p-2 bg-gray-50 rounded font-semibold">
                                {apprentice.totalAgreedApprenticeshipPrice}
                              </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="apprenticeProgram">Apprentice Program</Label>
                          {isEditing ? (
                              <Select
                                  value={formData.apprenticeProgram || "NotSpecified"}
                                  onValueChange={(value) => handleSelectChange("apprenticeProgram", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select program" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="NotSpecified">Not specified</SelectItem>
                                  {Object.values(ApprenticeshipProgram).map((program) => (
                                      <SelectItem key={program} value={program}>
                                        {program}
                                      </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                          ) : (
                              <div className="p-2 bg-gray-50 rounded">{apprentice.apprenticeProgram || "Not specified"}</div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="endDate">End Date</Label>
                          {isEditing ? (
                              <Input
                                  id="endDate"
                                  name="endDate"
                                  type="date"
                                  value={formData.endDate ? new Date(formData.endDate).toISOString().split("T")[0] : ""}
                                  onChange={handleInputChange}
                              />
                          ) : (
                              <div className="p-2 bg-gray-50 rounded">
                                {apprentice.endDate ? new Date(apprentice.endDate).toLocaleDateString() : "Not set"}
                              </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="completionDate">Completion Date</Label>
                          {isEditing ? (
                              <Input
                                  id="completionDate"
                                  name="completionDate"
                                  type="date"
                                  value={formData.completionDate ? new Date(formData.completionDate).toISOString().split("T")[0] : ""}
                                  onChange={handleInputChange}
                              />
                          ) : (
                              <div className="p-2 bg-gray-50 rounded">
                                {apprentice.completionDate ? new Date(apprentice.completionDate).toLocaleDateString() : "Not completed"}
                              </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="apprenticeAchievement">Achievement</Label>
                          {isEditing ? (
                              <Select
                                  value={formData.apprenticeAchievement || "NotSpecified"}
                                  onValueChange={(value) => handleSelectChange("apprenticeAchievement", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select achievement" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="NotSpecified">Not specified</SelectItem>
                                  {Object.values(Achievement).map((achievement) => (
                                      <SelectItem key={achievement} value={achievement}>
                                        {achievement}
                                      </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                          ) : (
                              <div className="p-2 bg-gray-50 rounded">{apprentice.apprenticeAchievement || "Not specified"}</div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="apprenticeClassification">Classification</Label>
                          {isEditing ? (
                              <Select
                                  value={formData.apprenticeClassification || "NotSpecified"}
                                  onValueChange={(value) => handleSelectChange("apprenticeClassification", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select classification" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="NotSpecified">Not specified</SelectItem>
                                  {Object.values(Classification).map((classification) => (
                                      <SelectItem key={classification} value={classification}>
                                        {classification}
                                      </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                          ) : (
                              <div className="p-2 bg-gray-50 rounded">{apprentice.apprenticeClassification || "Not specified"}</div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="certificatesReceived">Certificates Received</Label>
                          {isEditing ? (
                              <Select
                                  value={formData.certificatesReceived || "NotSpecified"}
                                  onValueChange={(value) => handleSelectChange("certificatesReceived", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select certificate status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="NotSpecified">Not specified</SelectItem>
                                  {Object.values(CertificateStatus).map((status) => (
                                      <SelectItem key={status} value={status}>
                                        {status}
                                      </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                          ) : (
                              <div className="p-2 bg-gray-50 rounded">{apprentice.certificatesReceived || "Not specified"}</div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="apprenticeProgression">Progression Tracker</Label>
                          {isEditing ? (
                              <Select
                                  value={formData.apprenticeProgression || "NotSpecified"}
                                  onValueChange={(value) => handleSelectChange("apprenticeProgression", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select progression" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="NotSpecified">Not specified</SelectItem>
                                  {Object.values(ProgressionTracker).map((progression) => (
                                      <SelectItem key={progression} value={progression}>
                                        {progression}
                                      </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                          ) : (
                              <div className="p-2 bg-gray-50 rounded">{apprentice.apprenticeProgression || "Not specified"}</div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="apprenticeNonCompletionReason">Non-Completion Reason</Label>
                        {isEditing ? (
                            <Select
                                value={formData.apprenticeNonCompletionReason || "NotSpecified"}
                                onValueChange={(value) => handleSelectChange("apprenticeNonCompletionReason", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select non-completion reason" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="NotSpecified">Not specified</SelectItem>
                                {Object.values(NonCompletionReason).map((reason) => (
                                    <SelectItem key={reason} value={reason}>
                                      {reason}
                                    </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                        ) : (
                            <div className="p-2 bg-gray-50 rounded">{apprentice.apprenticeNonCompletionReason || "Not specified"}</div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Transactions Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Transactions</CardTitle>
                      <CardDescription>
                        Related transaction records ({apprentice.transactions?.length || 0} total)
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {apprentice.transactions && apprentice.transactions.length > 0 ? (
                          <div className="space-y-2">
                            {apprentice.transactions.map((transaction) => (
                                <div
                                    key={transaction.id}
                                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                    onClick={() => handleTransactionClick(transaction)}
                                >
                                  <div>
                                    <div className="font-medium text-sm">{transaction.description}</div>
                                    <div className="text-xs text-gray-500 flex items-center gap-2">
                                      {new Date(transaction.transactionDate).toLocaleDateString()} •{" "}
                                      {transaction.transactionType}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="flex items-center gap-2">
                                      <div>
                                        {transaction.total}
                                      </div>
                                      <ExternalLink className="h-4 w-4 text-gray-400" />
                                    </div>
                                  </div>
                                </div>
                            ))}
                          </div>
                      ) : (
                          <div className="text-center text-gray-500 py-8">
                            No transactions found for this apprentice
                          </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>

              <SheetFooter className="p-6 border-t">
                <div className="flex justify-between w-full">
                  <div className="flex space-x-2">
                    {!isEditing && (
                        <Button onClick={() => setIsEditing(true)}>
                          Edit Apprentice
                        </Button>
                    )}
                    {isEditing && (
                        <>
                          <Button onClick={handleUpdateApprentice} disabled={!hasChanges}>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                          <Button variant="outline" onClick={handleCancel}>
                            Cancel
                          </Button>
                        </>
                    )}
                  </div>
                  <SheetClose asChild>
                    <Button variant="outline">Close</Button>
                  </SheetClose>
                </div>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>

        {/* Transaction Detail Panel */}
        <TransactionDetailModal
            transaction={selectedTransaction}
            isOpen={isTransactionPanelOpen}
            onClose={() => {
              setIsTransactionPanelOpen(false)
              setSelectedTransaction(null)
            }}
            onSave={handleTransactionSave}
        />
      </>
  )
}