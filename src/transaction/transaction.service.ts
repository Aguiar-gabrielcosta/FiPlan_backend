import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Transaction } from './entities/transaction.entity'
import { Repository } from 'typeorm'
import { AddTransactionDTO } from './dto/addTransactionDTO'
import { randomUUID } from 'crypto'
import { UpdateTransactionDTO } from './dto/updateTransactionDTO'

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  getAllTransactions(): Promise<Transaction[]> {
    return this.transactionRepository.find()
  }

  getTransactionById(transaction_id: string) {
    return this.transactionRepository.findOneBy({ transaction_id })
  }

  addTransaction(addTransactionDTO: AddTransactionDTO) {
    const transaction = new Transaction()
    transaction.transaction_id = randomUUID()
    transaction.user_id = addTransactionDTO.user_id
    transaction.category = addTransactionDTO.category
    transaction.transaction_type = addTransactionDTO.transaction_type
    transaction.transaction_value = addTransactionDTO.transaction_value
    transaction.transaction_date = addTransactionDTO.transaction_date
    return this.transactionRepository.save(transaction)
  }

  deleteTransaction(transaction_id: string): Promise<{ affected?: number }> {
    return this.transactionRepository.delete({ transaction_id })
  }

  updateTransaction(
    transaction_id: string,
    updateTransactionDTO: UpdateTransactionDTO,
  ) {
    const transaction = new Transaction()
    transaction.transaction_id = transaction_id
    transaction.user_id = updateTransactionDTO.user_id
    transaction.category = updateTransactionDTO.category
    transaction.transaction_date = updateTransactionDTO.transaction_date
    transaction.transaction_type = updateTransactionDTO.transaction_type
    transaction.transaction_value = updateTransactionDTO.transaction_value
    return this.transactionRepository.save(transaction)
  }

  async getTransactions(
    type?: 'income' | 'expense',
    timeFrame?: { startDate: Date; endDate: Date },
  ): Promise<Transaction[]> {
    let transactions = await this.getAllTransactions()

    if (type) {
      transactions = transactions.filter((item) => {
        return item.transaction_type === type
      })
    }

    if (timeFrame) {
      transactions = transactions.filter((item) => {
        return (
          item.transaction_date.getTime() >= timeFrame.startDate.getTime() &&
          item.transaction_date.getTime() <= timeFrame.endDate.getTime()
        )
      })
    }

    return transactions
  }

  getTotalValue(transactions: Transaction[]): number {
    let totalValue = 0
    transactions.forEach((item) => {
      totalValue += item.transaction_value
    })

    return totalValue
  }

  async monthlyExpense(): Promise<number> {
    const startDate = new Date()
    startDate.setDate(1)
    const endDate = new Date()
    endDate.setDate(30)

    const transactions = await this.getTransactions('expense', {
      startDate,
      endDate,
    })

    return this.getTotalValue(transactions)
  }

  async monthlyIncome(): Promise<number> {
    const startDate = new Date()
    startDate.setDate(1)
    const endDate = new Date()
    endDate.setDate(30)

    const transactions = await this.getTransactions('income', {
      startDate,
      endDate,
    })

    return this.getTotalValue(transactions)
  }
}
