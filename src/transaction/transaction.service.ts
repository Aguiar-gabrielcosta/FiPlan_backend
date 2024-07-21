import { Injectable } from '@nestjs/common'
import { DataTempService } from 'src/database/data.service'
import Transaction from 'src/database/interfaces/transaction.interface'

@Injectable()
export class TransactionService {
  getAllTransactionData(): Transaction[] {
    return new DataTempService().getAllTransectionData()
  }

  getTransactionTypeThisMonth(type: 'income' | 'expense'): number {
    const transactions = this.getAllTransactionData()

    const typeThisMonth = transactions.filter((item) => {
      return (
        item.transactionType === type &&
        item.date.getMonth === new Date().getMonth
      )
    })

    let totalValue = 0
    typeThisMonth.forEach((item) => {
      totalValue += item.transactionValue
    })

    return totalValue
  }
}
