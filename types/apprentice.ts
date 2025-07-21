import type {
  Achievement,
  ApprenticeshipProgram,
  CertificateStatus,
  Classification,
  DirectorateCode,
  Ethnicity,
  Gender,
  NonCompletionReason,
  ProgressionTracker,
  Status,
} from "@/types/enums"
import type { Transaction } from "@/types/transaction"

export interface Apprentice {
  readonly id: string // guid translates to string, init to readonly
  name: string
  startDate: Date
  status: Status
  uln: number
  readonly createdAt: Date
  dateOfBirth: Date
  apprenticeAchievement: Achievement | null
  apprenticeConfirmation: string | null
  apprenticeClassification: Classification | null
  apprenticeEthnicity: Ethnicity | null
  apprenticeGender: Gender | null
  apprenticeNonCompletionReason: NonCompletionReason | null
  apprenticeProgram: ApprenticeshipProgram | null
  apprenticeProgression: ProgressionTracker | null
  apprenticeshipDelivery: string | null
  certificatesReceived: CertificateStatus | null
  completionDate: Date | null
  directorate: DirectorateCode | null
  doeReference: string | null
  employeeNumber: string | null
  endDate: Date | null
  endPointAssessor: string | null
  isCareLeaver: boolean
  isDisabled: boolean
  managerName: string | null
  managerTitle: string | null
  pauseDate: Date | null
  post: string | null
  school: string | null
  totalAgreedApprenticeshipPrice: number
  trainingCourse: string | null
  trainingProvider: string | null
  ukprn: number | null
  withdrawalDate: Date | null

  // enriched data
  transactions: Transaction[]
}

export interface ApprenticeFind {
  startDate: Date | null
  status: Status | null
  directorate: DirectorateCode | null
  apprenticeProgram: ApprenticeshipProgram | null
}

export interface ApprenticeCreate {
  name: string
  startDate: Date
  status: Status
  uln: number
  dateOfBirth: Date
  apprenticeAchievement: Achievement | null
  apprenticeConfirmation: string | null
  apprenticeClassification: Classification | null
  apprenticeEthnicity: Ethnicity | null
  apprenticeGender: Gender | null
  apprenticeNonCompletionReason: NonCompletionReason | null
  apprenticeProgram: ApprenticeshipProgram | null
  apprenticeProgression: ProgressionTracker | null
  apprenticeshipDelivery: string | null
  certificatesReceived: CertificateStatus | null
  completionDate: Date | null
  directorate: DirectorateCode | null
  doeReference: string | null
  employeeNumber: string | null
  endDate: Date | null
  endPointAssessor: string | null
  isCareLeaver: boolean
  isDisabled: boolean
  managerName: string | null
  managerTitle: string | null
  pauseDate: Date | null
  post: string | null
  school: string | null
  totalAgreedApprenticeshipPrice: number
  trainingCourse: string | null
  trainingProvider: string | null
  ukprn: number | null
  withdrawalDate: Date | null
}

export interface ApprenticeUpdate {
  readonly id: string
  name: string
  startDate: Date
  status: Status
  uln: number
  readonly createdAt: Date
  dateOfBirth: Date
  apprenticeAchievement: Achievement | null
  apprenticeConfirmation: string | null
  apprenticeClassification: Classification | null
  apprenticeEthnicity: Ethnicity | null
  apprenticeGender: Gender | null
  apprenticeNonCompletionReason: NonCompletionReason | null
  apprenticeProgram: ApprenticeshipProgram | null
  apprenticeProgression: ProgressionTracker | null
  apprenticeshipDelivery: string | null
  certificatesReceived: CertificateStatus | null
  completionDate: Date | null
  directorate: DirectorateCode | null
  doeReference: string | null
  employeeNumber: string | null
  endDate: Date | null
  endPointAssessor: string | null
  isCareLeaver: boolean
  isDisabled: boolean
  managerName: string | null
  managerTitle: string | null
  pauseDate: Date | null
  post: string | null
  school: string | null
  totalAgreedApprenticeshipPrice: number
  trainingCourse: string | null
  trainingProvider: string | null
  ukprn: number | null
  withdrawalDate: Date | null
}