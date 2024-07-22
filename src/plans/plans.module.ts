import { Module } from '@nestjs/common'
import { PlansController } from './plans.controller'
import { BudgetService } from './budget.service'
import { CategoryService } from './category.service'
import { DataBaseModule } from 'src/database/database.module'
import { TransactionModule } from 'src/transaction/transaction.module'

@Module({
  imports: [DataBaseModule, TransactionModule],
  controllers: [PlansController],
  providers: [BudgetService, CategoryService],
  exports: [],
})
export class PlansModule {}
