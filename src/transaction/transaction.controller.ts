import { Body, Controller, Get, Post } from '@nestjs/common'
import { TransactionService } from './transaction.service'
import Transaction from './interfaces/transaction.interface'
import { AddTransactionDTO } from './dto/addTransactionDTO'

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  findAll(): Transaction[] {
    return this.transactionService.getAllTransactions()
  }

  @Post()
  async addTransaction(@Body() addTransactionDTO: AddTransactionDTO) {
    await this.transactionService.addExpanse(addTransactionDTO)
    return 'Transação efetivada'
  }
}
