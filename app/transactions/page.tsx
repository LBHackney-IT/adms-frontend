'use client'

import React from "react"
import { TransactionSearch } from "@/components/transactions/transaction-search"
import { TransactionTable } from "@/components/transactions/transaction-table"
import { getAllTransactions, createTransaction } from "@/lib/fetch-calls"
import {TransactionCreateModal} from "@/components/transactions/transaction-create-modal";
import type {Transaction, TransactionCreate} from "@/types/transaction";
import {Button} from "@/components/ui/button";
import {Download, Plus} from "lucide-react";


export default function TransactionsPage() {

    const [isCreateModalOpen, setCreateModalOpen] = React.useState(false)
    const [transactionsState, setTransactionsState] = React.useState<Transaction[]>([])

    React.useEffect(() => {
        const initialTransactionLoad = async () => {
            try {
                const itransaction = await getAllTransactions();
                setTransactionsState(itransaction);
            } catch (e) {
                console.log(e.message, "error mesage");
            }
        };

        initialTransactionLoad();
    }, []);


    //handle function for creating new transaction
    const handleCreateTransaction = async (userAddedTransaction: TransactionCreate) => {
        const newTransaction = await createTransaction(userAddedTransaction);
        setCreateModalOpen(false)
    }


    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center p-2">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
                    <p className="text-muted-foreground mt-2">Manage and view all Transaction records</p>
                </div>
                <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => setCreateModalOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Transaction
                    </Button>
                    <Button onClick={()=> console.log(transactionsState, "exporting transactions")} className="primary">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>
            <TransactionSearch setTransactionsState={setTransactionsState} />
            <TransactionTable transactions={transactionsState} />

            {/* The modal is controlled by this client component */}
            <TransactionCreateModal
                isOpen={isCreateModalOpen}
                onClose={() => setCreateModalOpen(false)}
                handleCreateTransaction={handleCreateTransaction}
            />
        </div>
    )
}