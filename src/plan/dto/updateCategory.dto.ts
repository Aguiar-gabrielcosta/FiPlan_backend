import { PartialType } from '@nestjs/mapped-types'
import { AddCategoryDTO } from './addCategory.dto'
import { IsInt } from 'class-validator'

export class UpdateCategoryDTO extends PartialType(AddCategoryDTO) {
  @IsInt()
  category_id: number
}
