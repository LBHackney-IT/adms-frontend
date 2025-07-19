import type { DirectorateCode, ApprenticeshipProgram, Status } from "@/types/enums"

export interface Transaction {
  readonly id: string // guid translates to string, init to readonly
  description: string
  transactionDate: Date
  transactionType: string
  readonly createdAt: Date
  courseLevel: number
  englishPercentage: number
  governmentContribution: number
  levyDeclared: number
  paidFromLevy: number
  payrollMonth: Date
  tenPercentageTopUp: number
  total: number
  yourContribution: number
  apprenticeName: string | null
  apprenticeshipTrainingCourse: string | null
  payeScheme: string | null
  trainingProvider: string | null
  uln: number | null

  //enriched data
  apprenticeDirectorate: DirectorateCode
  apprenticeProgram: ApprenticeshipProgram
  apprenticeStatus: Status
}

export interface TransactionFind{
  fromDate: Date | null
  toDate: Date | null
  description: string | null
}

export interface TransactionCreate {
  description: string
  transactionDate: Date
  transactionType: string
  courseLevel: number | null
  englishPercentage: number | null
  governmentContribution: number | null
  levyDeclared: number | null
  paidFromLevy: number | null
  payrollMonth: Date | null
  tenPercentageTopUp: number | null
  total: number | null
  yourContribution: number | null
  apprenticeName: string | null
  apprenticeshipTrainingCourse: string | null
  payeScheme: string | null
  trainingProvider: string | null
  uln: number | null
}

export interface TransactionUpdate {
  readonly id: string
  description: string
  transactionDate: Date
  transactionType: string
  readonly createdAt: Date
  courseLevel: number
  englishPercentage: number
  governmentContribution: number
  levyDeclared: number
  paidFromLevy: number
  payrollMonth: Date
  tenPercentageTopUp: number
  total: number
  yourContribution: number
  apprenticeName: string | null
  apprenticeshipTrainingCourse: string | null
  payeScheme: string | null
  trainingProvider: string | null
  uln: number | null
}