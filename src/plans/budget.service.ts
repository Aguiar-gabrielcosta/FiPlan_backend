import { Injectable } from '@nestjs/common'
import Budget from './interfaces/budget.interface'

const startDate = new Date()
const endDate = new Date()
endDate.setDate(30)

@Injectable()
export class BudgetService {
  private readonly budgets: Budget[] = [
    {
      budgetId: '2796460d-4c46-4cfd-ae9f-a95e93d4189b',
      budgetValue: 10000,
      userId: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
      startDate: startDate,
      endDate: endDate,
    },
  ]

  getAllBudgets(): Budget[] {
    return this.budgets
  }
}
