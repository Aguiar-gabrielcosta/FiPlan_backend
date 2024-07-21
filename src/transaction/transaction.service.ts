import { Injectable } from '@nestjs/common'
import Transaction from './interfaces/transaction.interface'

@Injectable()
export class TransactionService {
  private readonly tansactions: Transaction[] = [
    {
      userId: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
      transactionId: '61f6c7d7-3f03-427c-bc28-d0429faeb399',
      transactionValue: 1000,
      transactionType: 'expense',
      category: 'alimentação',
      date: new Date(),
    },
    {
      userId: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
      transactionId: 'd223a945-d627-40d7-9bc4-4cff7dece4ca',
      transactionValue: 543.2,
      transactionType: 'expense',
      category: 'iFood',
      date: new Date(),
    },
    {
      userId: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
      transactionId: 'a9dda6f1-9d5a-47a3-97d2-37d29a50dd5e',
      transactionValue: 243.5,
      transactionType: 'expense',
      category: 'Uber',
      date: new Date(),
    },
    {
      userId: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
      transactionId: 'bad008ac-0d70-4ec3-9897-76f140f38131',
      transactionValue: 730,
      transactionType: 'expense',
      category: 'cabeleireiro',
      date: new Date(),
    },
    {
      userId: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
      transactionId: 'bad008ac-0d70-4ec3-9897-76f140f38131',
      transactionValue: 5000,
      transactionType: 'income',
      category: null,
      date: new Date(),
    },
  ]

  getAllTransactions(): Transaction[] {
    return this.tansactions
  }

  getTransactionTypeThisMonth(type: 'income' | 'expense'): number {
    const typeThisMonth = this.tansactions.filter((item) => {
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
