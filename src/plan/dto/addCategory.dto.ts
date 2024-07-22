import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator'

export class AddCategoryDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, {
    message: 'A categoria deve ser nomeada com no máximo 50 caracteres.}',
  })
  category: string

  @IsUUID()
  @IsNotEmpty()
  plan_id: string

  @IsNumber()
  category_budget: number
}
