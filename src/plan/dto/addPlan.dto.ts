import { IsISO8601, IsNotEmpty, IsNumber, IsUUID } from 'class-validator'

export class AddPlanDTO {
  @IsNotEmpty()
  @IsUUID()
  user_id: string

  @IsNumber()
  budget_value: number

  @IsISO8601()
  start_date: Date

  @IsISO8601()
  end_date: Date
}
