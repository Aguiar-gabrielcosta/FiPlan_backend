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

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  create(@Body() createPlanDTO: AddPlanDTO) {
    return this.planService.addPlan(createPlanDTO)
  }

  @Get()
  findAll() {
    return this.planService.getAllPlans()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planService.getOnePlan(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanDTO: UpdatePlanDTO) {
    return this.planService.updatePlan(id, updatePlanDTO)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planService.deletePlan(id)
  }
}
