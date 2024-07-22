import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { AddTransactionDTO } from './dto/addTransactionDTO'
import { UpdateTransactionDTO } from './dto/updateTransactionDTO'

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  findAll() {
    return this.transactionService.getAllTransactions()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.getTransactionById(id)
  }

  @Post()
  create(@Body() addTransactionDTO: AddTransactionDTO) {
    return this.transactionService.addTransaction(addTransactionDTO)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDTO: UpdateTransactionDTO,
  ) {
    return this.transactionService.updateTransaction(id, updateTransactionDTO)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.transactionService.deleteTransaction(id)
  }

  @Get('balance')
  getMonthlyBalance() {
    return {
      monthExpense: this.transactionService.monthlyExpense(),
      monthIncome: this.transactionService.monthlyIncome(),
    }
  }
}
