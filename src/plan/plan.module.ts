import { Module } from '@nestjs/common'
import { PlanService } from './plan.service'
import { PlanController } from './plan.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Plan } from './entities/plan.entity'
import { CategoryService } from './category.service'
import { Category } from './entities/category.entity'
import { CategoryController } from './category.controller'
import { TransactionModule } from 'src/transaction/transaction.module'

@Module({
  imports: [TypeOrmModule.forFeature([Plan, Category]), TransactionModule],
  controllers: [PlanController, CategoryController],
  providers: [PlanService, CategoryService],
  exports: [PlanService, CategoryService],
})
export class PlanModule {}