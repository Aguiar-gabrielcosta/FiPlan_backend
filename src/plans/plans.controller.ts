import { Controller, Get } from '@nestjs/common'
import { BudgetService } from './budget.service'
import Category from './interfaces/category.interface'
import { CategoryService } from './category.service'
import { GetPlansDTO } from './dto/getPlansDTO'

@Controller('plans')
export class PlansController {
  constructor(
    private budgetService: BudgetService,
    private categoryService: CategoryService,
  ) {}

  @Get()
  getPlans(): GetPlansDTO[] {
    return this.budgetService.getPlans()
  }

  @Get('categories')
  getCategories(): Category[] {
    return this.categoryService.getAllCategoriesData()
  }
}
