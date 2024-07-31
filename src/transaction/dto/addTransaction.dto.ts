import { IsIn, IsISO8601, IsNotEmpty, IsNumber, IsUUID } from 'class-validator'

export class AddTransactionDTO {
  @IsNotEmpty()
  @IsUUID()
  user_id: string

  @IsNotEmpty()
  @IsNumber()
  category_id: number

  @IsIn(['expense', 'income'])
  transaction_type: 'expense' | 'income'

  @IsNotEmpty()
  @IsNumber()
  transaction_value: number

  @IsISO8601()
  transaction_date: Date
}
