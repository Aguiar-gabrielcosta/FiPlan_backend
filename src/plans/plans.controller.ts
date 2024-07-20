import { Controller, Get } from '@nestjs/common'
import { BudgetService } from './budget.service'
import Budget from './interfaces/budget.interface'
import Category from './interfaces/category.interface'
import { CategoryService } from './category.service'

@Controller('plans')
export class PlansController {
  constructor(
    private budgetService: BudgetService,
    private categoryService: CategoryService,
  ) {}

  @Get('budgets')
  getBudgets(): Budget[] {
    return this.budgetService.getAllBudgets()
  }

  @Get('categories')
  getCategories(): Category[] {
    return this.categoryService.getAllCategories()
  }
}
