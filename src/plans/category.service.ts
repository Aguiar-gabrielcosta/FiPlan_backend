import { Injectable } from '@nestjs/common'
import Category from './interfaces/category.interface'

@Injectable()
export class CategoryService {
  private readonly categories: Category[] = [
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
  ]

  getAllCategories(): Category[] {
    return this.categories
  }
}
