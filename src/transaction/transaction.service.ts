import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Transaction } from './entities/transaction.entity'
import { Repository } from 'typeorm'
import { AddTransactionDTO } from './dto/addTransaction.dto'
import { randomUUID } from 'crypto'
import { UpdateTransactionDTO } from './dto/updateTransaction.dto'

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  addTransaction(addTransactionDTO: AddTransactionDTO): {
    transaction_id: string
  } {
    const transaction = new Transaction()
    transaction.transaction_id = randomUUID()
    transaction.user_id = addTransactionDTO.user_id
    transaction.category_id = addTransactionDTO.category_id
    transaction.transaction_type = addTransactionDTO.transaction_type
    transaction.transaction_value = addTransactionDTO.transaction_value
    transaction.transaction_date = addTransactionDTO.transaction_date
    this.transactionRepository.save(transaction)
    return { transaction_id: transaction.transaction_id }
  }

  getAllTransactions(): Promise<Transaction[]> {
    return this.transactionRepository.find()
  }

  getTransactionById(transaction_id: string): Promise<Transaction> {
    return this.transactionRepository.findOneBy({ transaction_id })
  }

  updateTransaction(
    transaction_id: string,
    updateTransactionDTO: UpdateTransactionDTO,
  ): Promise<Transaction> {
    const transaction = new Transaction()
    transaction.transaction_id = transaction_id
    transaction.user_id = updateTransactionDTO.user_id
    transaction.category_id = updateTransactionDTO.category_id
    transaction.transaction_date = updateTransactionDTO.transaction_date
    transaction.transaction_type = updateTransactionDTO.transaction_type
    transaction.transaction_value = updateTransactionDTO.transaction_value
    return this.transactionRepository.save(transaction)
  }

  deleteTransaction(transaction_id: string): Promise<{ affected?: number }> {
    return this.transactionRepository.delete({ transaction_id })
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
  async getMonthlyBalance(user_id: string): Promise<{
    month_expense: number
    month_income: number
  }> {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const start_date = new Date(year, month, 1).toISOString()
    const end_date = new Date(year, month + 1, 0).toISOString()

    const data: { transaction_type: 'expense' | 'income'; sum: number }[] =
      await this.transactionRepository.query(`
        SELECT transaction_type, SUM(transaction_value) FROM "transaction"
        WHERE user_id='${user_id}'
        AND transaction_date BETWEEN '${start_date}' AND '${end_date}'
        GROUP BY transaction_type;  
      `)

    const values = { month_expense: 0, month_income: 0 }

    data.map((item) => {
      if (item.transaction_type === 'expense') {
        values.month_expense = item.sum
      }

      if (item.transaction_type === 'income') {
        values.month_income = item.sum
      }
    })

    return values
  }

  // Função para relação category/despesa de um plano
  async getExpensesPerCategory(
    user_id: string,
    plan_id: string,
  ): Promise<
    {
      expenses: number
      category: string
      category_budget: string
      progress: number
    }[]
  > {
    const data = await this.transactionRepository.query(`
        SELECT category.category, SUM("transaction".transaction_value) AS expenses, category.category_budget FROM "transaction"
        FULL JOIN category ON "transaction".category_id = category.category_id
        WHERE "transaction".user_id = '${user_id}' 
        AND category.plan_id = '${plan_id}'
        AND "transaction".transaction_type = 'expense'
        GROUP BY category.category_id
        ORDER BY expenses DESC;
      `)

    const expensesPerCategory = data.map((item) => {
      return {
        progress: parseFloat((item.expenses / item.category_budget).toFixed(2)),
        ...item,
      }
    })

    return expensesPerCategory
  }
}
