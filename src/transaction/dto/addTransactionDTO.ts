import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator'

export class AddTransactionDTO {
  @IsNotEmpty()
  @IsUUID()
  user_id: string

  @IsString()
  @MaxLength(50)
  category?: string

  @IsIn(['expense', 'income'])
  transaction_type: 'expense' | 'income'

  @IsNumber()
  transaction_value: number

  @IsDate()
  transaction_date: Date
}
