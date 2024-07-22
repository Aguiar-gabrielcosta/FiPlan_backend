import { Controller, Get } from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { MonthlyBalanceDTO } from './dto/monthlyBalanceDTO'
import Transaction from 'src/database/interfaces/transaction.interface'

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  findAll(): Transaction[] {
    return this.transactionService.getAllTransactionData()
  }

  @Get('balance')
  getMonthlyBalance(): MonthlyBalanceDTO {
    return {
      monthExpense: this.transactionService.monthlyExpense(),
      monthIncome: this.transactionService.monthlyIncome(),
    }
  }
}
