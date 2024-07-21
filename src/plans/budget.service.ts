import { Injectable } from '@nestjs/common'
import { GetPlansDTO } from './dto/getPlansDTO'
import { DataTempService } from 'src/database/data.service'

@Injectable()
export class BudgetService {
  getPlans(): GetPlansDTO[] {
    const plans = []
    const budgets = new DataTempService().getAllBudgetData()

    budgets.forEach((budget) => {
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
