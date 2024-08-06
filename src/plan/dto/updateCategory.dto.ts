import { PartialType } from '@nestjs/mapped-types'
import { AddCategoryDTO } from './addCategory.dto'

export class UpdateCategoryDTO extends PartialType(AddCategoryDTO) {}
