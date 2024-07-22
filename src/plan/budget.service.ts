// import { Injectable } from '@nestjs/common'
// import { GetPlansDTO } from './dto/getPlansDTO'
// import { PlanInfoDTO } from './dto/getPlanInfoDTO'
// import { TransactionService } from 'src/transaction/transaction.service'

// @Injectable()
// export class BudgetService {
//   getAllBudgetData(): Budget[] {
//     return new DataTempService().getAllBudgetData()
//   }

//   getBudgetById(id: string): Budget {
//     const budgets = this.getAllBudgetData()
//     return budgets.find((budget) => {
//       return budget.budgetId === id
//     })
//   }

//   getPlans(): GetPlansDTO[] {
//     const plans = []
//     const budgets = this.getAllBudgetData()

//     budgets.forEach((budget) => {
//       const plan = {
//         budgetId: budget.budgetId,
//         startDate: budget.startDate,
//         endDate: budget.endDate,
//       }

//       plans.push(plan)
//     })

//     return plans
//   }

//   getPlanInfo(budgetId: string): PlanInfoDTO {
//     const budget = this.getBudgetById(budgetId)
//     const planBudget = budget.budgetValue
//     const totalExpenses =
//       new TransactionService().getTransactionTypeAtTimeFrame(
//         'expense',
//         budget.startDate,
//         budget.endDate,
//       )
//     const porcentage = Math.round((totalExpenses / planBudget) * 100)

//     return {
//       planBudget,
//       totalExpenses,
//       porcentage,
//       startDate: budget.startDate,
//       endDate: budget.endDate,
//     }
//   }
// }
