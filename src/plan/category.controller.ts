import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { AddCategoryDTO } from './dto/addCategory.dto'
import { UpdateCategoryDTO } from './dto/updateCategory.dto'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post()
  createCategory(@Body() addCategoryDTO: AddCategoryDTO) {
    return this.categoryService.addCategory(addCategoryDTO)
  }

  @Get()
  findAllCategories() {
    return this.categoryService.getAllCategories()
  }

  @Get(':id')
  findOneCategory(@Param('id') id: string) {
    return this.categoryService.getOneCategory(id)
  }

  @Patch(':id')
  updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDTO: UpdateCategoryDTO,
  ) {
    return this.categoryService.updateCategory(id, updateCategoryDTO)
  }

  @Delete(':id')
  removeCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id)
  }
}
