import { PartialType } from '@nestjs/mapped-types'
import { AddPlanDTO } from './addPlan.dto'

export class UpdatePlanDTO extends PartialType(AddPlanDTO) {}
