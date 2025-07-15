export enum Achievement {
  Achieved = "Achieved",
  NonAchieved = "Non Achieved",
  PartialAchievement = "Partial Achievement",
}

export enum ApprenticeshipProgram {
  Cdq = "CDQ",
  NewRecruit = "New Recruit",
  SchoolCdq = "School CDQ",
  SchoolNewrecruit = "School New Recruit",
}

export enum CertificateStatus {
  Lost = "Lost",
  OutForDelivery = "Out for Delivery",
  Received = "Received",
}

export enum Classification {
  CareerDevelopmentQualification = "Career Development Qualification",
  NewlyRecruitedHackneyCouncilEmployee = "Newly Recruited Hackney Council Employee",
  NewlyRecruitedSchoolEmployee = "Newly Recruited School Employee",
  UpskillingSchoolEmployee = "Upskilling School Employee",
}

export enum DirectorateCode {
  AHI = "AHI",
  CEx = "CEx",
  CFS = "CFS",
  CHE = "CHE",
  Education = "Education",
  FandR = "F & R",
  School = "School",
}

export enum Ethnicity {
  African = "African",
  Asian = "Asian",
  AsianBritish = "Asian British",
  BlackBritish = "Black British",
  Caribbean = "Caribbean",
  Indian = "Indian",
  Mixed = "Mixed",
  Other = "Other",
  PreferNotToSay = "Prefer Not to Say",
  Turkish = "Turkish",
  WhiteBritish = "White British",
  WhiteOther = "White Other",
}

export enum Gender {
  Female = "Female",
  Male = "Male",
  PreferNotToSay = "Prefer Not to Say",
  NonBinary = "Non-Binary",
  Transgender = "Transgender",
}

export enum NonCompletionReason {
  ChangedTrainingProvider = "Changed Training Provider",
  ContractEnded = "Contract Ended",
  Dismissed = "Dismissed",
  NEET = "NEET",
  PersonalReason = "Personal Reason",
  ProgrammeDissatisfaction = "Programme Dissatisfaction",
  Redundancy = "Redundancy",
  Resigned = "Resigned",
  Sickness = "Sickness",
  TrainingProviderFault = "Training Provider Fault",
  Unknown = "Unknown",
  WorkDemands = "Work Demands",
}

export enum ProgressionTracker {
  CouncilJob = "Council Job",
  ExternalJobOrApprenticeship = "External Job or Apprenticeship",
  ExternalPromotion = "External Promotion",
  FurtherLBHApprenticeship = "Further LBH Apprenticeship",
  HigherEducation = "Higher Education",
  Leaver = "Leaver",
  NEET = "NEET",
  NoCouncilJob = "No Council Job",
  Promotion = "Promotion",
  Unknown = "Unknown",
}

export enum Status {
  Break = "Break",
  Completed = "Completed",
  Live = "Live",
  Paused = "Paused",
  Stopped = "Stopped",
}

export enum AuditLogStatus {
  Success = "Success",
  Failure = "Failure",
  Skipped = "Skipped",
  InProgress = "InProgress",
}

export enum EventType {
  DataIngestion = "DataIngestion",
  ValidationError = "ValidationError",
  ApprenticeAdded = "ApprenticeAdded",
  ApprenticeUpdated = "ApprenticeUpdated",
  ApprenticeDeleted = "ApprenticeDeleted",
  TransactionAdded = "TransactionAdded",
  TransactionUpdated = "TransactionUpdated",
  TransactionDeleted = "TransactionDeleted",
}
