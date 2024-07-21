import { Injectable } from '@nestjs/common'
import Budget from './interfaces/budget.interface'
import { GetPlansDTO } from './dto/getPlansDTO'

const startDate = new Date()
const endDate = new Date()
endDate.setDate(30)
const thirdDate = new Date()
thirdDate.setMonth(11)

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
    {
      budgetId: '2796460d-4c46-4cfd-ad45-a95e93d4553c',
      budgetValue: 10000,
      userId: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
      startDate: endDate,
      endDate: thirdDate,
    },
  ]

  getAllBudgetData(): Budget[] {
    return this.budgets
  }

  getPlans(): GetPlansDTO[] {
    const plans = []

    this.budgets.forEach((budget) => {
      const plan = {
        budgetId: budget.budgetId,
        startDate: budget.startDate.toLocaleDateString('pt-br'),
        endDate: budget.endDate.toLocaleDateString('pt-br'),
      }

      plans.push(plan)
    })

    return plans
  }
}
