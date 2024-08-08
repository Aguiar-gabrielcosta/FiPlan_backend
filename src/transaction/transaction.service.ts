import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Transaction } from './entities/transaction.entity'
import { Repository, UpdateResult } from 'typeorm'
import { AddTransactionDTO } from './dto/addTransaction.dto'
import { randomUUID } from 'crypto'
import { UpdateTransactionDTO } from './dto/updateTransaction.dto'

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  private items_per_page: number = 10

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
  ): Promise<UpdateResult> {
    return this.transactionRepository.update(transaction_id, {
      category_id: updateTransactionDTO.category_id,
      transaction_date: updateTransactionDTO.transaction_date,
      transaction_type: updateTransactionDTO.transaction_type,
      transaction_value: updateTransactionDTO.transaction_value,
    })
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

  async getPageNumber(
    user_id: string,
  ): Promise<{ pages: number; items_per_page: number }> {
    const items_per_page = this.items_per_page
    const numberOfTransactions = await this.transactionRepository.count({
      where: { user_id },
    })

    const pages = Math.floor(numberOfTransactions / this.items_per_page) + 1

    return { pages: pages, items_per_page: items_per_page }
  }

  async getTransactionsHistoryPage(
    user_id: string,
    page: number,
  ): Promise<
    {
      transaction_id: string
      category: string
      transaction_value: number
      transaction_type: 'expense' | 'income'
      transaction_date: string
    }[]
  > {
    const items_per_page = this.items_per_page
    const offset = (page - 1) * items_per_page

    const query = await this.transactionRepository.query(`
        SELECT "transaction".transaction_id, category.category, "transaction".transaction_value, "transaction".transaction_type, "transaction".transaction_date
        FROM "transaction"
        JOIN category ON "transaction".category_id = category.category_id
        WHERE "transaction".user_id = '${user_id}'
        ORDER BY "transaction".transaction_date DESC
        LIMIT ${items_per_page} OFFSET ${offset}
      `)

    return query
  }
}
