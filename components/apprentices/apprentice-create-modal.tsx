
"use client"

import React from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import type { ApprenticeCreate } from "@/types/apprentice"
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

interface ApprenticeCreateModalProps {
  isOpen: boolean
  onClose: () => void
  handleCreateApprentice: (apprentice: ApprenticeCreate) => void
}

export function ApprenticeCreateModal({ isOpen, onClose, handleCreateApprentice }: ApprenticeCreateModalProps) {

  const [formData, setFormData] = React.useState<ApprenticeCreate>({
    name: "",
    startDate: new Date(),
    status: Status.Live,
    uln: 0,
    dateOfBirth: new Date(),
    apprenticeAchievement: null,
    apprenticeConfirmation: null,
    apprenticeClassification: null,
    apprenticeEthnicity: null,
    apprenticeGender: null,
    apprenticeNonCompletionReason: null,
    apprenticeProgram: null,
    apprenticeProgression: null,
    apprenticeshipDelivery: null,
    certificatesReceived: null,
    completionDate: null,
    directorate: null,
    doeReference: null,
    employeeNumber: null,
    endDate: null,
    endPointAssessor: null,
    isCareLeaver: false,
    isDisabled: false,
    managerName: null,
    managerTitle: null,
    pauseDate: null,
    post: null,
    school: null,
    totalAgreedApprenticeshipPrice: 0,
    trainingCourse: null,
    trainingProvider: null,
    ukprn: null,
    withdrawalDate: null,
  })

  const resetForm = () => {
    setFormData({
      name: "",
      startDate: new Date(),
      status: Status.Live,
      uln: 0,
      dateOfBirth: new Date(),
      apprenticeAchievement: null,
      apprenticeConfirmation: null,
      apprenticeClassification: null,
      apprenticeEthnicity: null,
      apprenticeGender: null,
      apprenticeNonCompletionReason: null,
      apprenticeProgram: null,
      apprenticeProgression: null,
      apprenticeshipDelivery: null,
      certificatesReceived: null,
      completionDate: null,
      directorate: null,
      doeReference: null,
      employeeNumber: null,
      endDate: null,
      endPointAssessor: null,
      isCareLeaver: false,
      isDisabled: false,
      managerName: null,
      managerTitle: null,
      pauseDate: null,
      post: null,
      school: null,
      totalAgreedApprenticeshipPrice: 0,
      trainingCourse: null,
      trainingProvider: null,
      ukprn: null,
      withdrawalDate: null,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value, type} = e.target;
    const processedValue = type === 'date' && value ? new Date(value) : (value || null);
    setFormData(prev => ({...prev, [name]: processedValue}));
  };

  const handleSelectChange = (name: string, value: string) => {
    const processedValue = value === "Not specified" ? null : value
    setFormData(prev => ({ ...prev, [name]: processedValue }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }))
  }

  const handleCreate = async () => {
    try {
      await handleCreateApprentice(formData)
      onClose()
      resetForm()
    } catch (err: any) {
      console.log(err.message || 'Failed to create apprentice')
    }
  }

  const isFormValid = formData.name.trim() !== "" && formData.uln > 0

  return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="h-full w-1/2">
          <div className="flex flex-col h-full">
            <SheetHeader>
              <div className="flex items-center justify-between">
                <div className="pl-3 mb-[-24px]">
                  <SheetTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Create New Apprentice
                  </SheetTitle>
                  <SheetDescription>Please enter all the relevant apprentice details below.</SheetDescription>
                </div>
              </div>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Personal Details Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Details</CardTitle>
                    <CardDescription>Basic personal information and demographics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter apprentice name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString().split("T")[0] : ""}
                            onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="apprenticeEthnicity">Ethnicity</Label>
                        <Select
                            value={formData.apprenticeEthnicity || "Not specified"}
                            onValueChange={(value) => handleSelectChange("apprenticeEthnicity", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select ethnicity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Not specified">Not specified</SelectItem>
                            {Object.values(Ethnicity).map((ethnicity) => (
                                <SelectItem key={ethnicity} value={ethnicity}>
                                  {ethnicity}
                                </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apprenticeGender">Gender</Label>
                        <Select
                            value={formData.apprenticeGender || "Not specified"}
                            onValueChange={(value) => handleSelectChange("apprenticeGender", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Not specified">Not specified</SelectItem>
                            {Object.values(Gender).map((gender) => (
                                <SelectItem key={gender} value={gender}>
                                  {gender}
                                </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                              id="isCareLeaver"
                              checked={formData.isCareLeaver}
                              onCheckedChange={(checked) => handleCheckboxChange("isCareLeaver", checked as boolean)}
                          />
                          <Label htmlFor="isCareLeaver">Care Leaver</Label>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                              id="isDisabled"
                              checked={formData.isDisabled}
                              onCheckedChange={(checked) => handleCheckboxChange("isDisabled", checked as boolean)}
                          />
                          <Label htmlFor="isDisabled">Disabled</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Apprenticeship Details Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Apprenticeship Details</CardTitle>
                    <CardDescription>Training program and apprenticeship information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="uln">ULN *</Label>
                        <Input
                            id="uln"
                            name="uln"
                            type="number"
                            value={formData.uln || ""}
                            onChange={handleInputChange}
                            placeholder="Enter ULN"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                            id="startDate"
                            name="startDate"
                            type="date"
                            value={formData.startDate ? new Date(formData.startDate).toISOString().split("T")[0] : ""}
                            onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                            id="endDate"
                            name="endDate"
                            type="date"
                            value={formData.endDate ? new Date(formData.endDate).toISOString().split("T")[0] : ""}
                            onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                            value={formData.status}
                            onValueChange={(value) => handleSelectChange("status", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(Status).map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apprenticeProgram">Apprentice Program</Label>
                        <Select
                            value={formData.apprenticeProgram || "Not specified"}
                            onValueChange={(value) => handleSelectChange("apprenticeProgram", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select program" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Not specified">Not specified</SelectItem>
                            {Object.values(ApprenticeshipProgram).map((program) => (
                                <SelectItem key={program} value={program}>
                                  {program}
                                </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="trainingCourse">Training Course</Label>
                        <Input
                            id="trainingCourse"
                            name="trainingCourse"
                            value={formData.trainingCourse ?? ""}
                            onChange={handleInputChange}
                            placeholder="Enter training course"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="trainingProvider">Training Provider</Label>
                        <Input
                            id="trainingProvider"
                            name="trainingProvider"
                            value={formData.trainingProvider ?? ""}
                            onChange={handleInputChange}
                            placeholder="Enter training provider"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="totalAgreedApprenticeshipPrice">Total Agreed Apprenticeship Price</Label>
                      <Input
                          id="totalAgreedApprenticeshipPrice"
                          name="totalAgreedApprenticeshipPrice"
                          type="number"
                          step="0.01"
                          value={formData.totalAgreedApprenticeshipPrice || ""}
                          onChange={handleInputChange}
                          placeholder="0.00"
                      />
                    </div>

                    <Separator />

                    {/* Additional Apprenticeship Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 pb-2 border-b">Additional Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="ukprn">UKPRN</Label>
                          <Input
                              id="ukprn"
                              name="ukprn"
                              type="number"
                              value={formData.ukprn ?? ""}
                              onChange={handleInputChange}
                              placeholder="Enter UKPRN"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="completionDate">Completion Date</Label>
                          <Input
                              id="completionDate"
                              name="completionDate"
                              type="date"
                              value={formData.completionDate ? new Date(formData.completionDate).toISOString().split("T")[0] : ""}
                              onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="apprenticeAchievement">Achievement</Label>
                          <Select
                              value={formData.apprenticeAchievement || "Not specified"}
                              onValueChange={(value) => handleSelectChange("apprenticeAchievement", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select achievement" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Not specified">Not specified</SelectItem>
                              {Object.values(Achievement).map((achievement) => (
                                  <SelectItem key={achievement} value={achievement}>
                                    {achievement}
                                  </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="apprenticeClassification">Classification</Label>
                          <Select
                              value={formData.apprenticeClassification || "Not specified"}
                              onValueChange={(value) => handleSelectChange("apprenticeClassification", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select classification" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Not specified">Not specified</SelectItem>
                              {Object.values(Classification).map((classification) => (
                                  <SelectItem key={classification} value={classification}>
                                    {classification}
                                  </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="certificatesReceived">Certificates Received</Label>
                          <Select
                              value={formData.certificatesReceived || "Not specified"}
                              onValueChange={(value) => handleSelectChange("certificatesReceived", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select certificate status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Not specified">Not specified</SelectItem>
                              {Object.values(CertificateStatus).map((status) => (
                                  <SelectItem key={status} value={status}>
                                    {status}
                                  </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="apprenticeProgression">Progression Tracker</Label>
                          <Select
                              value={formData.apprenticeProgression || "Not specified"}
                              onValueChange={(value) => handleSelectChange("apprenticeProgression", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select progression" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Not specified">Not specified</SelectItem>
                              {Object.values(ProgressionTracker).map((progression) => (
                                  <SelectItem key={progression} value={progression}>
                                    {progression}
                                  </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="apprenticeNonCompletionReason">Non-Completion Reason</Label>
                          <Select
                              value={formData.apprenticeNonCompletionReason || "Not specified"}
                              onValueChange={(value) => handleSelectChange("apprenticeNonCompletionReason", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select reason" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Not specified">Not specified</SelectItem>
                              {Object.values(NonCompletionReason).map((reason) => (
                                  <SelectItem key={reason} value={reason}>
                                    {reason}
                                  </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pauseDate">Pause Date</Label>
                          <Input
                              id="pauseDate"
                              name="pauseDate"
                              type="date"
                              value={formData.pauseDate ? new Date(formData.pauseDate).toISOString().split("T")[0] : ""}
                              onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="withdrawalDate">Withdrawal Date</Label>
                          <Input
                              id="withdrawalDate"
                              name="withdrawalDate"
                              type="date"
                              value={formData.withdrawalDate ? new Date(formData.withdrawalDate).toISOString().split("T")[0] : ""}
                              onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="apprenticeshipDelivery">Apprenticeship Delivery</Label>
                          <Input
                              id="apprenticeshipDelivery"
                              name="apprenticeshipDelivery"
                              value={formData.apprenticeshipDelivery ?? ""}
                              onChange={handleInputChange}
                              placeholder="Enter delivery method"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Employment Details Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Employment Details</CardTitle>
                    <CardDescription>Workplace and management information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="employeeNumber">Employee Number</Label>
                        <Input
                            id="employeeNumber"
                            name="employeeNumber"
                            value={formData.employeeNumber ?? ""}
                            onChange={handleInputChange}
                            placeholder="Enter employee number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="post">Post</Label>
                        <Input
                            id="post"
                            name="post"
                            value={formData.post ?? ""}
                            onChange={handleInputChange}
                            placeholder="Enter job post/title"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="managerName">Manager Name</Label>
                        <Input
                            id="managerName"
                            name="managerName"
                            value={formData.managerName ?? ""}
                            onChange={handleInputChange}
                            placeholder="Enter manager name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="managerTitle">Manager Title</Label>
                        <Input
                            id="managerTitle"
                            name="managerTitle"
                            value={formData.managerTitle ?? ""}
                            onChange={handleInputChange}
                            placeholder="Enter manager title"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="directorate">Directorate</Label>
                        <Select
                            value={formData.directorate || "Not specified"}
                            onValueChange={(value) => handleSelectChange("directorate", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select directorate" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Not specified">Not specified</SelectItem>
                            {Object.values(DirectorateCode).map((directorate) => (
                                <SelectItem key={directorate} value={directorate}>
                                  {directorate}
                                </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="school">School</Label>
                        <Input
                            id="school"
                            name="school"
                            value={formData.school ?? ""}
                            onChange={handleInputChange}
                            placeholder="Enter school name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="doeReference">DOE Reference</Label>
                        <Input
                            id="doeReference"
                            name="doeReference"
                            value={formData.doeReference ?? ""}
                            onChange={handleInputChange}
                            placeholder="Enter DOE reference"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endPointAssessor">End Point Assessor</Label>
                        <Input
                            id="endPointAssessor"
                            name="endPointAssessor"
                            value={formData.endPointAssessor ?? ""}
                            onChange={handleInputChange}
                            placeholder="Enter end point assessor"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="apprenticeConfirmation">Apprentice Confirmation</Label>
                      <Input
                          id="apprenticeConfirmation"
                          name="apprenticeConfirmation"
                          value={formData.apprenticeConfirmation ?? ""}
                          onChange={handleInputChange}
                          placeholder="Enter confirmation details"
                      />
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>

            <SheetFooter className="border-t bg-white p-[16px]">
              <div className="flex justify-between">
                <SheetClose asChild>
                  <Button variant="outline" onClick={resetForm}>Cancel</Button>
                </SheetClose>
                <Button onClick={handleCreate} disabled={!isFormValid}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Apprentice
                </Button>
              </div>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
  )
}