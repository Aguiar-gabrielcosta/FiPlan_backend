import { IsNotEmpty, IsUUID } from 'class-validator'

export class PlanProgressDTO {
  @IsUUID()
  @IsNotEmpty()
  plan_id: string

  @IsUUID()
  @IsNotEmpty()
  user_id: string
}
