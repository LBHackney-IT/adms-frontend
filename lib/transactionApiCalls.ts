import {Transaction, TransactionFind, TransactionCreate, TransactionUpdate} from "@/types/transaction"

export const createTransaction = async (transaction: TransactionCreate) => {
  try{
    const response = await fetch(`/api/Transactions/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction)
    })
    if (response.ok) {
      const result = await response.json()
      return result
    } else {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

  } catch(error){
    if (error instanceof Error) {
      alert(error.message)
    } else {
      alert("An unexpected error occurred")
    }
  }
}

export const getAllTransactions = async () => {
  try{
    const response = await fetch(`/api/Transactions/all`, {
      method: "GET",
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

  } catch(error){
    if (error instanceof Error) {
      alert(error.message)
    } else {
      alert("An unexpected error occurred")
    }
  }
}

export const findTransactions = async (transactionQuery: TransactionFind) => {
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

  try{
    const response = await fetch(`/api/Transactions/find${queryParams}`, {
      method: "GET",
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

  } catch(error){
    if (error instanceof Error) {
      alert(error.message)
    } else {
      alert("An unexpected error occurred")
    }
  }
}

export const updateTransaction = async (transaction: TransactionUpdate) => {
  try{
    const response = await fetch(`/api/Transactions`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction)
    })
    if (response.ok) {
      const result = await response.json()
      return result
    } else {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

  } catch(error){
    if (error instanceof Error) {
      alert(error.message)
    } else {
      alert("An unexpected error occurred")
    }
  }
}

export const deleteTransaction = async (transactionId: string) => {
  try {
    const response = await fetch(`/api/Transactions/${transactionId}`, {
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