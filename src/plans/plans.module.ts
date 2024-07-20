import { Module } from '@nestjs/common'
import { PlansController } from './plans.controller'
import { BudgetService } from './budget.service'
import { CategoryService } from './category.service'

@Module({
  imports: [],
  controllers: [PlansController],
  providers: [BudgetService, CategoryService],
  exports: [],
})
export class PlansModule {}
