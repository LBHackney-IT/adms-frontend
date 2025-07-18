import {Transaction, TransactionFind, TransactionCreate} from "@/types/transaction"
import {Apprentice, ApprenticeCreate, ApprenticeFind} from "@/types/apprentice";
import {
  DirectorateCode,
  ApprenticeshipProgram,
  Status
} from "@/types/enums"


//example of api call i want to use
export const exampleFetchCall = async (id: string) => {
    try {
        const response = await fetch(`https://13.60.83.197:3210/questions/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (response.ok) {
            const result = await response.json()
            return result
        } else {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
    } catch (error) {
        if (error instanceof Error) {
            alert(error.message)
        } else {
            alert("An unexpected error occurred")
        }
    }
}



  // Simulate get all  transactions API call
export const getAllTransactions = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100))
  const transactions: Transaction[] = [
    {
      id: "TXN001",
      description: "Monthly training payment for software development course",
      transactionDate: new Date("2024-01-15"),
      transactionType: "Learning",
      createdAt: new Date("2024-01-15"),
      courseLevel: 4,
      englishPercentage: 10,
      governmentContribution: 180,
      levyDeclared: 1200,
      paidFromLevy: 1200,
      payrollMonth: new Date("2024-01-01"),
      tenPercentageTopUp: 120,
      total: 1500,
      yourContribution: 0,
      apprenticeName: "Sarah Johnson",
      apprenticeshipTrainingCourse: "Software Developer Level 4",
      payeScheme: "123/AB12345",
      trainingProvider: "QA Training",
      uln: 1234567890,
      apprenticeDirectorate: DirectorateCode.AHI,
      apprenticeProgram: ApprenticeshipProgram.NewRecruit,
      apprenticeStatus: Status.Live,
    },
    {
      id: "TXN002",
      description: "Business administration training payment",
      transactionDate: new Date("2024-01-10"),
      transactionType: "Learning",
      createdAt: new Date("2024-01-10"),
      courseLevel: 3,
      englishPercentage: 15,
      governmentContribution: 150,
      levyDeclared: 1000,
      paidFromLevy: 1000,
      payrollMonth: new Date("2024-01-01"),
      tenPercentageTopUp: 100,
      total: 1250,
      yourContribution: 0,
      apprenticeName: "Michael Chen",
      apprenticeshipTrainingCourse: "Business Administration Level 3",
      payeScheme: "456/CD67890",
      trainingProvider: "City & Guilds",
      uln: 2345678901,
      apprenticeDirectorate: DirectorateCode.CFS,
      apprenticeProgram: ApprenticeshipProgram.Cdq,
      apprenticeStatus: Status.Live,
    },
    {
      id: "TXN003",
      description: "Teaching assistant completion payment",
      transactionDate: new Date("2024-01-05"),
      transactionType: "Completion",
      createdAt: new Date("2024-01-05"),
      courseLevel: 3,
      englishPercentage: 20,
      governmentContribution: 200,
      levyDeclared: 1800,
      paidFromLevy: 1800,
      payrollMonth: new Date("2024-01-01"),
      tenPercentageTopUp: 180,
      total: 2000,
      yourContribution: 0,
      apprenticeName: "Emma Williams",
      apprenticeshipTrainingCourse: "Teaching Assistant Level 3",
      payeScheme: "789/EF12345",
      trainingProvider: "Learning Partners",
      uln: 3456789012,
      apprenticeDirectorate: DirectorateCode.Education,
      apprenticeProgram: ApprenticeshipProgram.SchoolNewrecruit,
      apprenticeStatus: Status.Completed,
    },
  ]
  return transactions
}

//simulated findTransactions api call
export const findTransactions = async (transactionQuery: TransactionFind) => {
  await new Promise((resolve) => setTimeout(resolve, 100))
  const queryParams = new URLSearchParams()

  if (transactionQuery.fromDate) {
    queryParams.append('fromDate', transactionQuery.fromDate.toISOString())
  }
  if (transactionQuery.toDate) {
    queryParams.append('toDate', transactionQuery.toDate.toISOString())
  }
  if (transactionQuery.description) {
    queryParams.append('description', transactionQuery.description)
  }

  console.log(`API Call: https://api.example.com/transactions?${queryParams.toString()}`)

  const transactions: Transaction[] = [
    {
      id: "TXN004",
      description: "Digital Marketing course payment",
      transactionDate: new Date("2024-01-20"),
      transactionType: "Learning",
      createdAt: new Date("2024-01-20"),
      courseLevel: 3,
      englishPercentage: 10,
      governmentContribution: 160,
      levyDeclared: 1100,
      paidFromLevy: 1100,
      payrollMonth: new Date("2024-01-01"),
      tenPercentageTopUp: 110,
      total: 1370,
      yourContribution: 0,
      apprenticeName: "Alex Smith",
      apprenticeshipTrainingCourse: "Digital Marketing Level 3",
      payeScheme: "321/XY98765",
      trainingProvider: "Digital Skills Ltd",
      uln: 4567890123,
      apprenticeDirectorate: DirectorateCode.CEx,
      apprenticeProgram: ApprenticeshipProgram.NewRecruit,
      apprenticeStatus: Status.Live
    },
    {
      id: "TXN005",
      description: "Data Analysis completion payment",
      transactionDate: new Date("2024-01-18"),
      transactionType: "Completion",
      createdAt: new Date("2024-01-18"),
      courseLevel: 4,
      englishPercentage: 15,
      governmentContribution: 200,
      levyDeclared: 1400,
      paidFromLevy: 1400,
      payrollMonth: new Date("2024-01-01"),
      tenPercentageTopUp: 140,
      total: 1740,
      yourContribution: 0,
      apprenticeName: "Emily Brown",
      apprenticeshipTrainingCourse: "Data Analysis Level 4",
      payeScheme: "654/PQ43210",
      trainingProvider: "Data Training Academy",
      uln: 5678901234,
      apprenticeDirectorate: DirectorateCode.CHE,
      apprenticeProgram: ApprenticeshipProgram.Cdq,
      apprenticeStatus: Status.Completed
    }
  ]

  return transactions
}

export const createTransaction = async (transaction: TransactionCreate) => {
  await new Promise((resolve) => setTimeout(resolve, 100))
  const newTransaction = {
    id: "TXN006",
    description: transaction.description,
    transactionDate: transaction.transactionDate,
    transactionType: transaction.transactionType,
    createdAt: new Date(),
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
  return newTransaction;
}

export const updateTransaction = async (transaction: TransactionCreate) => {
  await new Promise((resolve) => setTimeout(resolve, 100))
  const updatedTransaction = {
    id: "TXN006",
    description: transaction.description,
    transactionDate: transaction.transactionDate,
    transactionType: transaction.transactionType,
    createdAt: new Date(),
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
  return updatedTransaction;
}

export const deleteTransaction = async (transactionId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return true;
}
  


//simulate get all apprentices api call
export const getAllApprentices = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const apprentices: Apprentice[] = [
    {
      id: "APP001",
      name: "Sarah Johnson",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2025-01-15"),
      apprenticeProgram: ApprenticeshipProgram.NewRecruit,
      status: Status.Live,
      directorate: DirectorateCode.AHI,
      trainingProvider: "QA Training",
      trainingCourse: "Software Developer Level 4",
      uln: 1234567890,
      createdAt: new Date(),
      dateOfBirth: new Date("2002-05-20"),
      isCareLeaver: false,
      isDisabled: false,
      totalAgreedApprenticeshipPrice: 15000,
      transactions: [],
      apprenticeAchievement: null,
      apprenticeConfirmation: null,
      apprenticeClassification: null,
      apprenticeEthnicity: null,
      apprenticeGender: null,
      apprenticeNonCompletionReason: null,
      apprenticeProgression: null,
      apprenticeshipDelivery: null,
      certificatesReceived: null,
      completionDate: null,
      doeReference: null,
      employeeNumber: null,
      endPointAssessor: null,
      managerName: null,
      managerTitle: null,
      pauseDate: null,
      post: null,
      school: null,
      ukprn: null,
      withdrawalDate: null,
    },
    {
      id: "APP002",
      name: "Michael Chen",
      startDate: new Date("2024-01-10"),
      endDate: new Date("2025-01-10"),
      apprenticeProgram: ApprenticeshipProgram.Cdq,
      status: Status.Live,
      directorate: DirectorateCode.CFS,
      trainingProvider: "City & Guilds",
      trainingCourse: "Business Administration Level 3",
      uln: 2345678901,
      createdAt: new Date(),
      dateOfBirth: new Date("2001-11-12"),
      isCareLeaver: false,
      isDisabled: true,
      totalAgreedApprenticeshipPrice: 12000,
      transactions: [],
      apprenticeAchievement: null,
      apprenticeConfirmation: null,
      apprenticeClassification: null,
      apprenticeEthnicity: null,
      apprenticeGender: null,
      apprenticeNonCompletionReason: null,
      apprenticeProgression: null,
      apprenticeshipDelivery: null,
      certificatesReceived: null,
      completionDate: null,
      doeReference: null,
      employeeNumber: null,
      endPointAssessor: null,
      managerName: null,
      managerTitle: null,
      pauseDate: null,
      post: null,
      school: null,
      ukprn: null,
      withdrawalDate: null,
      transactions: [{
        id: "TXN004",
        description: "Digital Marketing course payment",
        transactionDate: new Date("2024-01-20"),
        transactionType: "Learning",
        createdAt: new Date("2024-01-20"),
        courseLevel: 3,
        englishPercentage: 10,
        governmentContribution: 160,
        levyDeclared: 1100,
        paidFromLevy: 1100,
        payrollMonth: new Date("2024-01-01"),
        tenPercentageTopUp: 110,
        total: 1370,
        yourContribution: 0,
        apprenticeName: "Alex Smith",
        apprenticeshipTrainingCourse: "Digital Marketing Level 3",
        payeScheme: "321/XY98765",
        trainingProvider: "Digital Skills Ltd",
        uln: 4567890123,
        apprenticeDirectorate: DirectorateCode.CEx,
        apprenticeProgram: ApprenticeshipProgram.NewRecruit,
        apprenticeStatus: Status.Live
      },
        {
          id: "TXN005",
          description: "Data Analysis completion payment",
          transactionDate: new Date("2024-01-18"),
          transactionType: "Completion",
          createdAt: new Date("2024-01-18"),
          courseLevel: 4,
          englishPercentage: 15,
          governmentContribution: 200,
          levyDeclared: 1400,
          paidFromLevy: 1400,
          payrollMonth: new Date("2024-01-01"),
          tenPercentageTopUp: 140,
          total: 1740,
          yourContribution: 0,
          apprenticeName: "Emily Brown",
          apprenticeshipTrainingCourse: "Data Analysis Level 4",
          payeScheme: "654/PQ43210",
          trainingProvider: "Data Training Academy",
          uln: 5678901234,
          apprenticeDirectorate: DirectorateCode.CHE,
          apprenticeProgram: ApprenticeshipProgram.Cdq,
          apprenticeStatus: Status.Completed
        }]
    },
    {
      id: "APP003",
      name: "Emma Williams",
      startDate: new Date("2024-01-05"),
      endDate: new Date("2025-01-05"),
      apprenticeProgram: ApprenticeshipProgram.SchoolNewrecruit,
      status: Status.Completed,
      directorate: DirectorateCode.Education,
      trainingProvider: "Learning Partners",
      trainingCourse: "Teaching Assistant Level 3",
      uln: 3456789012,
      createdAt: new Date(),
      dateOfBirth: new Date("2000-03-30"),
      isCareLeaver: true,
      isDisabled: false,
      totalAgreedApprenticeshipPrice: 9000,
      transactions: [],
      apprenticeAchievement: null,
      apprenticeConfirmation: null,
      apprenticeClassification: null,
      apprenticeEthnicity: null,
      apprenticeGender: null,
      apprenticeNonCompletionReason: null,
      apprenticeProgression: null,
      apprenticeshipDelivery: null,
      certificatesReceived: null,
      completionDate: null,
      doeReference: null,
      employeeNumber: null,
      endPointAssessor: null,
      managerName: null,
      managerTitle: null,
      pauseDate: null,
      post: null,
      school: null,
      ukprn: null,
      withdrawalDate: null,
    },
  ];
  return apprentices;
};

export const findApprentices = async (apprenticeQuery: ApprenticeFind) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const queryParams = new URLSearchParams()

  if (apprenticeQuery.startDate) {
    queryParams.append('startDate', apprenticeQuery.startDate.toISOString())
  }

  const apprentices: Apprentice[] = [
    {
      id: "APP004",
      name: "John Smith",
      startDate: new Date("2024-02-01"),
      endDate: new Date("2025-02-01"),
      apprenticeProgram: ApprenticeshipProgram.NewRecruit,
      status: Status.Live,
      directorate: DirectorateCode.CEx,
      trainingProvider: "Tech Academy",
      trainingCourse: "Cloud Engineering Level 4",
      uln: 4567890123,
      createdAt: new Date(),
      dateOfBirth: new Date("2003-08-15"),
      isCareLeaver: false,
      isDisabled: false,
      totalAgreedApprenticeshipPrice: 18000,
      transactions: [],
      apprenticeAchievement: null,
      apprenticeConfirmation: null,
      apprenticeClassification: null,
      apprenticeEthnicity: null,
      apprenticeGender: null,
      apprenticeNonCompletionReason: null,
      apprenticeProgression: null,
      apprenticeshipDelivery: null,
      certificatesReceived: null,
      completionDate: null,
      doeReference: null,
      employeeNumber: null,
      endPointAssessor: null,
      managerName: null,
      managerTitle: null,
      pauseDate: null,
      post: null,
      school: null,
      ukprn: null,
      withdrawalDate: null
    },
    {
      id: "APP005",
      name: "Jane Wilson",
      startDate: new Date("2024-01-25"),
      endDate: new Date("2025-01-25"),
      apprenticeProgram: ApprenticeshipProgram.SchoolCdq,
      status: Status.Live,
      directorate: DirectorateCode.Education,
      trainingProvider: "Teaching Excellence",
      trainingCourse: "Early Years Education Level 3",
      uln: 5678901234,
      createdAt: new Date(),
      dateOfBirth: new Date("2002-04-22"),
      isCareLeaver: true,
      isDisabled: false,
      totalAgreedApprenticeshipPrice: 11000,
      transactions: [],
      apprenticeAchievement: null,
      apprenticeConfirmation: null,
      apprenticeClassification: null,
      apprenticeEthnicity: null,
      apprenticeGender: null,
      apprenticeNonCompletionReason: null,
      apprenticeProgression: null,
      apprenticeshipDelivery: null,
      certificatesReceived: null,
      completionDate: null,
      doeReference: null,
      employeeNumber: null,
      endPointAssessor: null,
      managerName: null,
      managerTitle: null,
      pauseDate: null,
      post: null,
      school: null,
      ukprn: null,
      withdrawalDate: null
    }
  ]
  return apprentices

}

export const createApprentice = async (apprentice: ApprenticeCreate) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const newApprentice = {
    id: "APP004",
    name: apprentice.name,
    startDate: apprentice.startDate,
    endDate: apprentice.endDate,
    apprenticeProgram: apprentice.apprenticeProgram,
    status: apprentice.status,
    directorate: apprentice.directorate,
    trainingProvider: apprentice.trainingProvider,
    trainingCourse: apprentice.trainingCourse,
    uln: apprentice.uln,
    createdAt: new Date(),
    dateOfBirth: apprentice.dateOfBirth,
    isCareLeaver: apprentice.isCareLeaver,
    isDisabled: apprentice.isDisabled,
    totalAgreedApprenticeshipPrice: apprentice.totalAgreedApprenticeshipPrice,
    transactions: [],
  }
  return newApprentice;
}

export const updateApprentice = async (apprentice: ApprenticeCreate) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  const updatedApprentice = {
    name: apprentice.name,
    startDate: apprentice.startDate,
    endDate: apprentice.endDate,
    apprenticeProgram: apprentice.apprenticeProgram,
    status: apprentice.status,
    directorate: apprentice.directorate,
    trainingProvider: apprentice.trainingProvider,
    trainingCourse: apprentice.trainingCourse,
    uln: apprentice.uln,
    createdAt: new Date(),
    dateOfBirth: apprentice.dateOfBirth,
    isCareLeaver: apprentice.isCareLeaver,
    isDisabled: apprentice.isDisabled,
    totalAgreedApprenticeshipPrice: apprentice.totalAgreedApprenticeshipPrice,
    transactions: [],
  }
  return updatedApprentice;
}

export const deleteApprentice = async (apprenticeId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return true;
}