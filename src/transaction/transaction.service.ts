import { Injectable } from '@nestjs/common'
import { DataTempService } from 'src/database/data.service'
import Transaction from 'src/database/interfaces/transaction.interface'

@Injectable()
export class TransactionService {
  getAllTransactionData(): Transaction[] {
    return new DataTempService().getAllTransectionData()
  }

  getTransactions(
    type?: 'income' | 'expense',
    timeFrame?: { startDate: Date; endDate: Date },
  ): Transaction[] {
    let transactions = this.getAllTransactionData()

    if (type) {
      transactions = transactions.filter((item) => {
        return item.transactionType === type
      })
    }

    if (timeFrame) {
      transactions = transactions.filter((item) => {
        return (
          item.date.getTime() >= timeFrame.startDate.getTime() &&
          item.date.getTime() <= timeFrame.endDate.getTime()
        )
      })
    }

    return transactions
  }

  getTotalValue(transactions: Transaction[]): number {
    let totalValue = 0
    transactions.forEach((item) => {
      totalValue += item.transactionValue
    })

    return totalValue
  }

  monthlyExpense(): number {
    const startDate = new Date()
    startDate.setDate(1)
    const endDate = new Date()
    endDate.setDate(30)

    const transactions = this.getTransactions('expense', { startDate, endDate })

    return this.getTotalValue(transactions)
  }

  monthlyIncome(): number {
    const startDate = new Date()
    startDate.setDate(1)
    const endDate = new Date()
    endDate.setDate(30)

    const transactions = this.getTransactions('income', { startDate, endDate })

    return this.getTotalValue(transactions)
  }

  getTransactionTypeAtTimeFrame(
    type: 'income' | 'expense',
    startDate: Date,
    endDate: Date,
  ): number {
    const startDateNumber = startDate.getTime()
    const endDateNumber = endDate.getTime()
    const transactions = this.getAllTransactionData()

    const typeThisMonth = transactions.filter((item) => {
      return (
        item.transactionType === type &&
        item.date.getTime() >= startDateNumber &&
        item.date.getTime() <= endDateNumber
      )
    })

    let totalValue = 0
    typeThisMonth.forEach((item) => {
      totalValue += item.transactionValue
    })

    return totalValue
  }
}
