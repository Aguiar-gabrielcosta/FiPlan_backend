import { Controller, Get } from '@nestjs/common'
import { TransactionService } from './transaction.service'
import Transaction from './interfaces/transaction.interface'
import { MonthlyBalanceDTO } from './dto/monthlyBalanceDTO'

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  findAll(): Transaction[] {
    return this.transactionService.getAllTransactions()
  }

  @Get('balance')
  getMonthlyBalance(): MonthlyBalanceDTO {
    return {
      monthExpense:
        this.transactionService.getTransactionTypeThisMonth('expense'),
      monthIncome:
        this.transactionService.getTransactionTypeThisMonth('income'),
    }
  }
}
