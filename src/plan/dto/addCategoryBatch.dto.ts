import { IsArray, ValidateNested } from 'class-validator'
import { Category } from '../entities/category.entity'

export class AddCategoryBatchDTO {
  @IsArray()
  @ValidateNested({ each: true })
  categories: Category[]
}
