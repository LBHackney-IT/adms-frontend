"use client"

import React from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import type { TransactionCreate } from "@/types/transaction"

interface TransactionCreatePanelProps {
  isOpen: boolean
  onClose: () => void
  handleCreateTransaction: (transaction: TransactionCreate) => void
}

export function TransactionCreateModal({ isOpen, onClose, handleCreateTransaction }: TransactionCreatePanelProps) {

  const [formData, setFormData] = React.useState<TransactionCreate>({
    description: "",
    transactionDate: new Date(),
    transactionType: "",
    courseLevel: null,
    englishPercentage: 0,
    governmentContribution: 0,
    levyDeclared: 0,
    paidFromLevy: 0,
    payrollMonth: null,
    tenPercentageTopUp: 0,
    total: 0,
    yourContribution: 0,
    apprenticeName: null,
    apprenticeshipTrainingCourse: null,
    payeScheme: null,
    trainingProvider: null,
    uln: null,
  })

  const resetForm = () => {
    setFormData({
      description: "",
      transactionDate: new Date(),
      transactionType: "",
      courseLevel: null,
      englishPercentage: 0,
      governmentContribution: 0,
      levyDeclared: 0,
      paidFromLevy: 0,
      payrollMonth: null,
      tenPercentageTopUp: 0,
      total: 0,
      yourContribution: 0,
      apprenticeName: null,
      apprenticeshipTrainingCourse: null,
      payeScheme: null,
      trainingProvider: null,
      uln: null,
    });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value, type} = e.target;
    const processedValue = type === 'date' && value ? new Date(value) : (value || null);
    setFormData(prev => ({...prev, [name]: processedValue}));
  };

  const handleCreate = async () => {
    try {
       await handleCreateTransaction(formData)
      onClose()
      resetForm();
    } catch (err) {
      console.log(err.message || 'Failed to create transaction');
    }
  };

  const isFormValid = formData.description.trim() !== "" && formData.transactionType.trim() !== "" && formData.transactionDate;

  return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="h-full w-1/2">
          <div className="flex flex-col h-full">
            <SheetHeader>
              <div className="flex items-center justify-between">
                <div className="pl-3 mb-[-24px]">
                  <SheetTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Create New Transaction
                  </SheetTitle>
                  <SheetDescription>Please enter all the relevant transaction details below.</SheetDescription>
                </div>
                </div>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Transaction Details Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction Details</CardTitle>
                    <CardDescription>Core transaction information and financial breakdown</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="transactionType">Transaction Type</Label>
                        <Input
                            id="transactionType"
                            name="transactionType"
                            value={formData.transactionType ?? ""}
                            onChange={handleInputChange}
                            placeholder="Enter Transaction Type"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="transactionDate">Transaction Date</Label>
                        <Input
                            id="transactionDate"
                            name="transactionDate"
                            type="date"
                            value={formData.transactionDate ? new Date(formData.transactionDate).toISOString().split("T")[0] : ""}
                            onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="payrollMonth">Payroll Month</Label>
                        <Input
                            id="payrollMonth"
                            name="payrollMonth"
                            type="date"
                            value={formData.payrollMonth ? new Date(formData.payrollMonth).toISOString().split("T")[0] : ""}
                            onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Enter transaction description"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <div className="space-y-2">
                        <Label htmlFor="payeScheme">PAYE Scheme</Label>
                        <Input
                            id="payeScheme"
                            name="payeScheme"
                            value={formData.payeScheme ?? ""}
                            onChange={handleInputChange}
                            placeholder="e.g., 123/AB12345"
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Financial Breakdown */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 pb-2 border-b">Financial Breakdown</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="levyDeclared">Levy Declared</Label>
                          <Input
                              id="levyDeclared"
                              name="levyDeclared"
                              type="number"
                              step="0.01"
                              value={formData.levyDeclared ?? ""}
                              onChange={handleInputChange}
                              placeholder="0.00"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="paidFromLevy">Paid from Levy</Label>
                          <Input
                              id="paidFromLevy"
                              name="paidFromLevy"
                              type="number"
                              step="0.01"
                              value={formData.paidFromLevy ?? ""}
                              onChange={handleInputChange}
                              placeholder="0.00"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="englishPercentage">English Percentage</Label>
                          <Input
                              id="englishPercentage"
                              name="englishPercentage"
                              type="number"
                              step="0.01"
                              value={formData.englishPercentage ?? ""}
                              onChange={handleInputChange}
                              placeholder="10.00"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tenPercentageTopUp">10% Top Up</Label>
                          <Input
                              id="tenPercentageTopUp"
                              name="tenPercentageTopUp"
                              type="number"
                              step="0.01"
                              value={formData.tenPercentageTopUp ?? ""}
                              onChange={handleInputChange}
                              placeholder="0.00"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="governmentContribution">Government Contribution</Label>
                          <Input
                              id="governmentContribution"
                              name="governmentContribution"
                              type="number"
                              step="0.01"
                              value={formData.governmentContribution ?? ""}
                              onChange={handleInputChange}
                              placeholder="0.00"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 mt-4">
                        <Label htmlFor="yourContribution">Your Contribution</Label>
                        <Input
                            id="yourContribution"
                            name="yourContribution"
                            type="number"
                            step="0.01"
                            value={formData.yourContribution ?? ""}
                            onChange={handleInputChange}
                            placeholder="0.00"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Transaction Learner Details Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction Learner Details</CardTitle>
                    <CardDescription>Apprentice and course information related to this transaction</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="apprenticeName">Apprentice Name</Label>
                        <Input
                            id="apprenticeName"
                            name="apprenticeName"
                            value={formData.apprenticeName ?? ""}
                            onChange={handleInputChange}
                            placeholder="Enter apprentice name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="uln">ULN</Label>
                        <Input
                            id="uln"
                            name="uln"
                            type="number"
                            value={formData.uln ?? ""}
                            onChange={handleInputChange}
                            placeholder="Enter ULN"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="apprenticeshipTrainingCourse">Apprenticeship Training Course</Label>
                      <Input
                          id="apprenticeshipTrainingCourse"
                          name="apprenticeshipTrainingCourse"
                          value={formData.apprenticeshipTrainingCourse ?? ""}
                          onChange={handleInputChange}
                          placeholder="Enter training course name"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="courseLevel">Course Level</Label>
                          <Input
                              id="courseLevel"
                              name="courseLevel"
                              type="number"
                              value={formData.courseLevel ?? ""}
                              onChange={handleInputChange}
                              placeholder="Enter Course Level"
                          />
                      </div>
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
                Create Transaction
              </Button>
              </div>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
  )
}