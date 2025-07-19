"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Save, AlertCircle, Hash } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import type {Transaction, TransactionCreate} from "@/types/transaction"

interface TransactionDetailPanelProps {
  transaction: Transaction | null
  isOpen: boolean
  onClose: () => void
  onSave: (transaction: TransactionCreate) => void
}

export function TransactionDetailModal({ transaction, isOpen, onClose, onSave }: TransactionDetailPanelProps) {
  const [formData, setFormData] = React.useState<TransactionCreate | null>(null)
  const [isEditing, setIsEditing] = React.useState(false)
  const [hasChanges, setHasChanges] = React.useState(false)

  React.useEffect(() => {
    if (transaction) {
      // Convert Transaction to TransactionCreate for editing
      const transactionCreate: TransactionCreate = {
        description: transaction.description,
        transactionDate: transaction.transactionDate,
        transactionType: transaction.transactionType,
        courseLevel: transaction.courseLevel,
        englishPercentage: transaction.englishPercentage,
        governmentContribution: transaction.governmentContribution,
        levyDeclared: transaction.levyDeclared,
        paidFromLevy: transaction.paidFromLevy,
        payrollMonth: transaction.payrollMonth,
        tenPercentageTopUp: transaction.tenPercentageTopUp,
        total: transaction.total,
        yourContribution: transaction.yourContribution,
        apprenticeName: transaction.apprenticeName,
        apprenticeshipTrainingCourse: transaction.apprenticeshipTrainingCourse,
        payeScheme: transaction.payeScheme,
        trainingProvider: transaction.trainingProvider,
        uln: transaction.uln,
      }
      setFormData(transactionCreate)
      setIsEditing(false)
      setHasChanges(false)
    }
  }, [transaction])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return

    const { name, value, type } = e.target
    const processedValue = type === 'date' && value ? new Date(value) : (value || null)
    setFormData(prev => prev ? { ...prev, [name]: processedValue } : null)
    setHasChanges(true)
  }

  // Reset form data from the original transaction
  const handleCancel = () => {
    if (transaction) {
      const transactionCreate: TransactionCreate = {
        description: transaction.description,
        transactionDate: transaction.transactionDate,
        transactionType: transaction.transactionType,
        courseLevel: transaction.courseLevel,
        englishPercentage: transaction.englishPercentage,
        governmentContribution: transaction.governmentContribution,
        levyDeclared: transaction.levyDeclared,
        paidFromLevy: transaction.paidFromLevy,
        payrollMonth: transaction.payrollMonth,
        tenPercentageTopUp: transaction.tenPercentageTopUp,
        total: transaction.total,
        yourContribution: transaction.yourContribution,
        apprenticeName: transaction.apprenticeName,
        apprenticeshipTrainingCourse: transaction.apprenticeshipTrainingCourse,
        payeScheme: transaction.payeScheme,
        trainingProvider: transaction.trainingProvider,
        uln: transaction.uln,
      }
      setFormData(transactionCreate)
      setIsEditing(false)
      setHasChanges(false)
    }
  }

  const handleUpdateTransaction = () => {
    if (formData && hasChanges)
    try {
      onSave(formData)
      setIsEditing(false)
      setHasChanges(false)
    } catch (err) {
      console.log((err as Error).message || 'Failed to update transaction');
    }
  };

  if (!formData || !transaction) return null

  return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="h-full w-1/2">
          <div className="flex flex-col h-full">
            <SheetHeader>
              <div className="flex items-center justify-between">
                <div className="pl-3 mb-[-24px]">
                  <SheetTitle className="flex items-center gap-2">
                    <Hash className="h-5 w-5" />
                    Transaction Details - {transaction.id}
                  </SheetTitle>
                  <SheetDescription>{transaction.transactionType}</SheetDescription>
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
                {/* Transaction Details Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction Details</CardTitle>
                    <CardDescription>Core transaction information and financial breakdown</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="id">Transaction ID</Label>
                        <div className="p-2 bg-gray-200 rounded font-mono text-sm">{transaction.id}</div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="transactionType">Transaction Type</Label>
                        {isEditing ? (
                            <Input id="transactionType" name="transactionType" value={formData.transactionType} onChange={handleInputChange} />
                        ) : (
                            <div className="p-2 bg-gray-50 rounded font-semibold">
                              {transaction.transactionType}
                            </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="transactionDate">Transaction Date</Label>
                        {isEditing ? (
                            <Input
                                id="transactionDate"
                                name="transactionDate"
                                type="date"
                                value={formData.transactionDate ? new Date(formData.transactionDate).toISOString().split("T")[0] : ""}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <div className="p-2 bg-gray-50 rounded text-sm">
                              {new Date(transaction.transactionDate).toLocaleDateString()}
                            </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="payrollMonth">Payroll Month</Label>
                        {isEditing ? (
                            <Input
                                id="payrollMonth"
                                name="payrollMonth"
                                type="date"
                                value={formData.payrollMonth ? new Date(formData.payrollMonth).toISOString().split("T")[0] : ""}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <div className="p-2 bg-gray-50 rounded text-sm">
                              {transaction.payrollMonth ? new Date(transaction.payrollMonth).toLocaleDateString() : "Not specified"}
                            </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      {isEditing ? (
                          <Input id="description" name="description" value={formData.description} onChange={handleInputChange} />
                      ) : (
                          <div className="p-2 bg-gray-50 rounded text-sm">{transaction.description}</div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <div className="p-2 bg-gray-50 rounded">{transaction.trainingProvider || "Not specified"}</div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="payeScheme">PAYE Scheme</Label>
                        {isEditing ? (
                            <Input
                                id="payeScheme"
                                name="payeScheme"
                                value={formData.payeScheme ?? ""}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <div className="p-2 bg-gray-50 rounded font-mono text-sm">
                              {transaction.payeScheme || "Not specified"}
                            </div>
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* Financial Breakdown */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 pb-2 border-b">Financial Breakdown</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="levyDeclared">Levy Declared</Label>
                          {isEditing ? (
                              <Input
                                  id="levyDeclared"
                                  name="levyDeclared"
                                  type="number"
                                  step="0.01"
                                  value={formData.levyDeclared ?? ""}
                                  onChange={handleInputChange}
                              />
                          ) : (
                              <div className="p-2 bg-blue-50 rounded font-semibold text-blue-700">
                                {transaction.levyDeclared}
                              </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="paidFromLevy">Paid from Levy</Label>
                          {isEditing ? (
                              <Input
                                  id="paidFromLevy"
                                  name="paidFromLevy"
                                  type="number"
                                  step="0.01"
                                  value={formData.paidFromLevy ?? ""}
                                  onChange={handleInputChange}
                              />
                          ) : (
                              <div className="p-2 bg-green-50 rounded font-semibold text-green-700">
                                {transaction.paidFromLevy}
                              </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="englishPercentage">English Percentage</Label>
                          {isEditing ? (
                              <Input
                                  id="englishPercentage"
                                  name="englishPercentage"
                                  type="number"
                                  step="0.01"
                                  value={formData.englishPercentage ?? ""}
                                  onChange={handleInputChange}
                              />
                          ) : (
                              <div className="p-2 bg-gray-50 rounded">{transaction.englishPercentage}%</div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tenPercentageTopUp">10% Top Up</Label>
                          {isEditing ? (
                              <Input
                                  id="tenPercentageTopUp"
                                  name="tenPercentageTopUp"
                                  type="number"
                                  step="0.01"
                                  value={formData.tenPercentageTopUp ?? ""}
                                  onChange={handleInputChange}
                              />
                          ) : (
                              <div className="p-2 bg-orange-50 rounded font-semibold text-orange-700">
                                {transaction.tenPercentageTopUp}
                              </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="governmentContribution">Government Contribution</Label>
                          {isEditing ? (
                              <Input
                                  id="governmentContribution"
                                  name="governmentContribution"
                                  type="number"
                                  step="0.01"
                                  value={formData.governmentContribution ?? ""}
                                  onChange={handleInputChange}
                              />
                          ) : (
                              <div className="p-2 bg-blue-50 rounded font-semibold text-blue-700">
                                {transaction.governmentContribution}
                              </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2 mt-4">
                        <Label htmlFor="yourContribution">Your Contribution</Label>
                        {isEditing ? (
                            <Input
                                id="yourContribution"
                                name="yourContribution"
                                type="number"
                                step="0.01"
                                value={formData.yourContribution ?? ""}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <div className="p-2 bg-orange-50 rounded text-lg font-semibold text-orange-700">
                              {transaction.yourContribution}
                            </div>
                        )}
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
                        {isEditing ? (
                            <Input
                                id="apprenticeName"
                                name="apprenticeName"
                                value={formData.apprenticeName ?? ""}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <div className="p-2 bg-gray-50 rounded font-medium">
                              {transaction.apprenticeName || "Not specified"}
                            </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="uln">ULN</Label>
                        {isEditing ? (
                            <Input
                                id="uln"
                                name="uln"
                                type="number"
                                value={formData.uln ?? ""}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <div className="p-2 bg-gray-50 rounded font-mono text-sm">
                              {transaction.uln || "Not specified"}
                            </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="apprenticeshipTrainingCourse">Apprenticeship Training Course</Label>
                      {isEditing ? (
                          <Input
                              id="apprenticeshipTrainingCourse"
                              name="apprenticeshipTrainingCourse"
                              value={formData.apprenticeshipTrainingCourse ?? ""}
                              onChange={handleInputChange}
                          />
                      ) : (
                          <div className="p-2 bg-gray-50 rounded">
                            {transaction.apprenticeshipTrainingCourse || "Not specified"}
                          </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="courseLevel">Course Level</Label>
                        {isEditing ? (
                            <Input
                                id="courseLevel"
                                name="courseLevel"
                                type="number"
                                value={formData.courseLevel ?? ""}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <div className="p-2 bg-gray-50 rounded">Level {transaction.courseLevel}</div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apprenticeStatus">Apprentice Status</Label>
                        <div className="p-2 bg-gray-200 rounded">{transaction.apprenticeStatus}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="apprenticeDirectorate">Apprentice Directorate</Label>
                        <div className="p-2 bg-gray-200 rounded">{transaction.apprenticeDirectorate}</div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apprenticeProgram">Apprentice Program</Label>
                        <div className="p-2 bg-gray-200 rounded">{transaction.apprenticeProgram}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <SheetFooter className="border-t bg-white p-[16px]">
              <div className="flex justify-between">
                {!isEditing ? (
                    <>
                      <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                      </SheetClose>
                      <Button onClick={() => setIsEditing(true)} className="bg-[#00664f]">
                        Edit Transaction
                      </Button>
                    </>
                ) : (
                    <>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                      <Button onClick={handleUpdateTransaction} className="bg-[#00664f]" disabled={!hasChanges}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </>
                )}
              </div>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
  )
}