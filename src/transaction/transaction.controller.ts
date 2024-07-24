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
import { UserPlanDTO } from './dto/userPlan.dto'

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

  @Get('expenses/category')
  getExpensesPerCategory(@Body() userPlanDTO: UserPlanDTO) {
    return this.transactionService.getExpensesPerCategory(userPlanDTO)
  }

  @Get(':id/balance')
  getMonthlyBalance(@Param('id') id: string) {
    return this.transactionService.monthlyBalance(id)
  }
}
