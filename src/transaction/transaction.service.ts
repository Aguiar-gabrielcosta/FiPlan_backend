import { Injectable } from '@nestjs/common'
import Transaction from './interfaces/transaction.interface'
import { randomUUID } from 'crypto'
import { AddExpenseDTO } from './dto/addExpenseDTO'

@Injectable()
export class TransactionService {
  private readonly tansactions: Transaction[] = [
    {
      userId: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
      transactionId: randomUUID(),
      transactionValue: 1000,
      transactionType: 'expense',
      category: 'alimentação',
      date: new Date(),
    },
    {
      userId: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
      transactionId: randomUUID(),
      transactionValue: 543.2,
      transactionType: 'expense',
      category: 'iFood',
      date: new Date(),
    },
    {
      userId: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
      transactionId: randomUUID(),
      transactionValue: 243.5,
      transactionType: 'expense',
      category: 'Uber',
      date: new Date(),
    },
    {
      userId: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
      transactionId: randomUUID(),
      transactionValue: 730,
      transactionType: 'expense',
      category: 'cabelereio',
      date: new Date(),
    },
  ]

  getAllTransactions(): Transaction[] {
    return this.tansactions
  }

  async addExpanse(expense: AddExpenseDTO) {
    const transaction: Transaction = {
      transactionId: randomUUID(),
      transactionType: 'expense',
      ...expense,
    }
    this.tansactions.push(transaction)
  }
}
