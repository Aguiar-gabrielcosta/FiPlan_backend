import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator'

export class AddPlanDTO {
  @IsNotEmpty()
  @IsUUID()
  user_id: string

  @IsNumber()
  budget_value: number

  @IsString()
  start_date: string

  @IsString()
  end_date: string
}
