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
      const responseBody = await response.text();
      if (responseBody) {
        return JSON.parse(responseBody);
      }
      return null;
    } else {
      const errorBody = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("An unexpected error occurred");
    }
  }
}

export const uploadTransactions = async (transactions: TransactionCreate[]) => {
  try{
    const response = await fetch(`/api/Transactions/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactions)
    })
    if (response.ok) {
      const responseBody = await response.text();
      if (responseBody) {
        return JSON.parse(responseBody);
      }
      return null;
    } else {
      const errorBody = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("An unexpected error occurred");
    }
  }
}

export const getAllTransactions = async () : Promise<Transaction[] | undefined> => {
  try{
    const response = await fetch(`/api/Transactions/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.ok) {
      const result = (await response.json()) as Transaction[]
      return result
    } else {
      const errorBody = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`)
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
    const response = await fetch(`/api/Transactions/find?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (response.ok) {
      const result = await response.json()
      return result
    } else {
      const errorBody = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`)
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
  try {
    const response = await fetch(`/api/Transactions`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });

    if (response.ok) {
      const responseBody = await response.text();
      if (responseBody) {
        return JSON.parse(responseBody);
      }
      return null;
    } else {
      const errorBody = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("An unexpected error occurred");
    }
  }
};

export const deleteTransaction = async (transactionId: string) => {
  try {
    const response = await fetch(`/api/Transactions/${transactionId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      const responseBody = await response.text();
      if (responseBody) {
        return JSON.parse(responseBody);
      }
      return null;
    } else {
      const errorBody = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("An unexpected error occurred");
    }
  }
}