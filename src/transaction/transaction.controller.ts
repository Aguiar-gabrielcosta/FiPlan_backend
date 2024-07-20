import { Body, Controller, Get, Post } from '@nestjs/common'
import { TransactionService } from './transaction.service'
import Transaction from './interfaces/transaction.interface'
import { AddExpenseDTO } from './dto/addExpenseDTO'

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  findAll(): Transaction[] {
    return this.transactionService.getAllTransactions()
  }

  @Post()
  async addExpense(@Body() addExpenseDTO: AddExpenseDTO) {
    await this.transactionService.addExpanse(addExpenseDTO)
    return 'Transação efetivada'
  }
}
