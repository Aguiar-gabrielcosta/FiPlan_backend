import { Controller, Get } from '@nestjs/common'
import { BudgetService } from './budget.service'
import { CategoryService } from './category.service'
import { GetPlansDTO } from './dto/getPlansDTO'
import Category from 'src/database/interfaces/category.interface'

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
    return this.categoryService.getAllCategoryData()
  }
}
