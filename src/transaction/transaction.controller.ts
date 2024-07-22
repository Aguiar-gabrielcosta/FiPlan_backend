import { Body, Controller, Get, Post } from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { AddTransactionDTO } from './dto/addTransactionDTO'

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  findAll() {
    return this.transactionService.getAllTransactions()
  }

  @Get('balance')
  getMonthlyBalance() {
    return {
      monthExpense: this.transactionService.monthlyExpense(),
      monthIncome: this.transactionService.monthlyIncome(),
    }
  }

  @Post()
  addTransaction(@Body() addTransactionDTO: AddTransactionDTO) {
    return this.transactionService.addTransaction(addTransactionDTO)
  }
}
