import { Injectable } from '@nestjs/common'
import Expense from './interfaces/expenses.interface'

@Injectable()
export class ExpensesService {
  private readonly expenses: Expense[] = [
    {
      user: 'test',
      expense: 35.2,
      date: new Date(),
      category: 'uber',
    },
    {
      user: 'test',
      expense: 350.2,
      date: new Date(),
      category: 'eletronico',
    },
    {
      user: 'test',
      expense: 20,
      date: new Date(),
      category: undefined,
    },
    {
      user: 'test',
      expense: 1000,
      date: new Date(),
      category: 'mercado',
    },
  ]

  add(expense: Expense) {
    this.expenses.push(expense)
  }

  findAll(): Expense[] {
    return this.expenses
  }
}
