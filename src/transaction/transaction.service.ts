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
    private transactionRepository: Repository<Transaction>,
  ) {}

  getAllTransactions(): Promise<Transaction[]> {
    return this.transactionRepository.find()
  }

  getTransactionById(transaction_id: string): Promise<Transaction> {
    return this.transactionRepository.findOneBy({ transaction_id })
  }

  addTransaction(addTransactionDTO: AddTransactionDTO): Promise<Transaction> {
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
  ): Promise<Transaction> {
    const transaction = new Transaction()
    transaction.transaction_id = transaction_id
    transaction.user_id = updateTransactionDTO.user_id
    transaction.category = updateTransactionDTO.category
    transaction.transaction_date = updateTransactionDTO.transaction_date
    transaction.transaction_type = updateTransactionDTO.transaction_type
    transaction.transaction_value = updateTransactionDTO.transaction_value
    return this.transactionRepository.save(transaction)
  }

  // Filtra as transações por receita/gasto e dentro do intervalo de tempo
  async getTransactions(
    type?: 'income' | 'expense',
    timeFrame?: { startDate: Date; endDate: Date },
  ): Promise<Transaction[]> {
    let transactions = await this.transactionRepository.find()

    if (type) {
      transactions = transactions.filter((item) => {
        return item.transaction_type === type
      })
    }

    if (timeFrame) {
      transactions = transactions.filter((item) => {
        const date = new Date(item.transaction_date)

        return (
          date.getTime() >= timeFrame.startDate.getTime() &&
          date.getTime() <= timeFrame.endDate.getTime()
        )
      })
    }

    return transactions
  }

  // Retorna a soma dos valores de uma lista de transações
  getTotalValue(transactions: Transaction[]): number {
    let totalValue = 0
    transactions.forEach((item) => {
      totalValue += item.transaction_value
    })

    return totalValue
  }

  // Função para retorno do balanço do mês
  async monthlyBalance(): Promise<{
    monthExpense: number
    monthIncome: number
  }> {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const startDate = new Date(year, month, 1)
    const endDate = new Date(year, month + 1, 0)

    const expenses = await this.getTransactions('expense', {
      startDate,
      endDate,
    })

    const incomes = await this.getTransactions('income', {
      startDate,
      endDate,
    })

    return {
      monthExpense: this.getTotalValue(expenses),
      monthIncome: this.getTotalValue(incomes),
    }
  }
}
