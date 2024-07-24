import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { PlanService } from './plan.service'
import { AddPlanDTO } from './dto/addPlan.dto'
import { UpdatePlanDTO } from './dto/updatePlan.dto'
import { PlanProgressDTO } from './dto/userPlan.dto'
import { TransactionService } from 'src/transaction/transaction.service'

@Controller('plan')
export class PlanController {
  constructor(
    private readonly planService: PlanService,
    private readonly transactionService: TransactionService,
  ) {}

  @Post('data')
  create(@Body() createPlanDTO: AddPlanDTO) {
    return this.planService.addPlan(createPlanDTO)
  }

  @Get('data')
  findAll() {
    return this.planService.getAllPlans()
  }

  @Get('data/:id')
  findOne(@Param('id') id: string) {
    return this.planService.getOnePlan(id)
  }

  @Patch('data/:id')
  update(@Param('id') id: string, @Body() updatePlanDTO: UpdatePlanDTO) {
    return this.planService.updatePlan(id, updatePlanDTO)
  }

  @Delete('data/:id')
  remove(@Param('id') id: string) {
    return this.planService.deletePlan(id)
  }

  // Recupera as informações de um plano do usuário
  // (orçamento, gastos no período, inicio e fim do plano e a porcentagem gasta)
  @Get('progress')
  getPlanProgress(@Body() planProgressDTO: PlanProgressDTO) {
    return this.planService.getPlanProgress(planProgressDTO)
  }

  @Get(':id')
  findUserPlans(@Param('id') id: string) {
    return this.planService.getAllPlanOfUser(id)
  }
}
