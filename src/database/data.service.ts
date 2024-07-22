import { Injectable } from '@nestjs/common'
import Transaction from './interfaces/transaction.interface'
import Category from './interfaces/category.interface'
import Budget from './interfaces/budget.interface'

const startDate = new Date()
const endDate = new Date()
endDate.setDate(30)
const thirdDate = new Date()
thirdDate.setMonth(11)

@Injectable()
export class DataTempService {
  private readonly data: {
    transactions: Transaction[]
    categories: Category[]
    budgets: Budget[]
  } = {
    transactions: [
      {
        userId: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
        transactionId: '61f6c7d7-3f03-427c-bc28-d0429faeb399',
        transactionValue: 1000,
        transactionType: 'expense',
        category: 'alimentação',
        date: new Date(),
      },
      {
        userId: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
        transactionId: 'd223a945-d627-40d7-9bc4-4cff7dece4ca',
        transactionValue: 543.2,
        transactionType: 'expense',
        category: 'iFood',
        date: new Date(),
      },
      {
        userId: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
        transactionId: 'a9dda6f1-9d5a-47a3-97d2-37d29a50dd5e',
        transactionValue: 243.5,
        transactionType: 'expense',
        category: 'Uber',
        date: new Date(),
      },
      {
        userId: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
        transactionId: 'bad008ac-0d70-4ec3-9897-76f140f38131',
        transactionValue: 730,
        transactionType: 'expense',
        category: 'cabeleireiro',
        date: new Date(),
      },
      {
        userId: '2dc5231a-ab37-4c1a-bdee-863d0a467483',
        transactionId: 'bad008ac-0d72-4ec3-9897-76f140f38131',
        transactionValue: 5000,
        transactionType: 'income',
        category: null,
        date: new Date(),
      },
    ],
    budgets: [
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
    ],
    categories: [
      {
        category: 'alimentação',
        budgetId: '2796460d-4c46-4cfd-ae9f-a95e93d4189b',
        categoryBudget: 3000,
      },
      {
        category: 'iFood',
        budgetId: '2796460d-4c46-4cfd-ae9f-a95e93d4189b',
        categoryBudget: 1500,
      },
      {
        category: 'Uber',
        budgetId: '2796460d-4c46-4cfd-ae9f-a95e93d4189b',
        categoryBudget: 500,
      },
      {
        category: 'cabeleireiro',
        budgetId: '2796460d-4c46-4cfd-ae9f-a95e93d4189b',
        categoryBudget: 1000,
      },
    ],
  }

  getAllTransectionData(): Transaction[] {
    return this.data.transactions
  }

  getAllBudgetData(): Budget[] {
    return this.data.budgets
  }

  getAllCategoryData(): Category[] {
    return this.data.categories
  }
}
