import { Body, Controller, Get, Post } from '@nestjs/common'
import { ExpensesService } from './expenses.service'
import Expense from './interfaces/expenses.interface'
import { AddExpenseDTO } from './dto/addExpenseDTO'

@Controller('expenses')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  @Get()
  findAll(): Expense[] {
    return this.expensesService.findAll()
  }

  @Post()
  add(@Body() addExpenseDto: AddExpenseDTO) {
    this.expensesService.add(addExpenseDto)
    return 'Expense Added'
  }
}
