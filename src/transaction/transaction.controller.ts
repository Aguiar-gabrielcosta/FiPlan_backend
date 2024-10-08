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
import { AddTransactionDTO } from './dto/addTransaction.dto'
import { UpdateTransactionDTO } from './dto/updateTransaction.dto'

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post('data')
  create(@Body() addTransactionDTO: AddTransactionDTO) {
    return this.transactionService.addTransaction(addTransactionDTO)
  }

  @Get('data')
  findAll() {
    return this.transactionService.getAllTransactions()
  }

  @Get('data/:id')
  findOne(@Param('id') id: string) {
    return this.transactionService.getTransactionById(id)
  }

  @Patch('data/:id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDTO: UpdateTransactionDTO,
  ) {
    return this.transactionService.updateTransaction(id, updateTransactionDTO)
  }

  @Delete('data/:id')
  delete(@Param('id') id: string) {
    return this.transactionService.deleteTransaction(id)
  }

  @Get('expenses/category/:userid/:planid')
  getExpensesPerCategory(
    @Param('userid') user_id: string,
    @Param('planid') plan_id: string,
  ) {
    return this.transactionService.getExpensesPerCategory(user_id, plan_id)
  }

  @Get('history/:userid/:page')
  getHistoryPage(
    @Param('userid') user_id: string,
    @Param('page') page: number,
  ) {
    return this.transactionService.getTransactionsHistoryPage(user_id, page)
  }

  @Get('pages/:userid')
  getPageNumber(@Param('userid') user_id: string) {
    return this.transactionService.getPageNumber(user_id)
  }

  @Get('balance/:id')
  getMonthlyBalance(@Param('id') id: string) {
    return this.transactionService.getMonthlyBalance(id)
  }
}
