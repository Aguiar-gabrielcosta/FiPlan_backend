import { IsDate, IsNotEmpty, IsNumber, IsUUID } from 'class-validator'

export class AddPlanDTO {
  @IsNotEmpty()
  @IsUUID()
  user_id: string

  @IsNumber()
  budget_value: number

  @IsDate()
  start_date: Date

  @IsDate()
  end_date: Date
}
