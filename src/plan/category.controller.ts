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
  @Post('data')
  createCategory(@Body() addCategoryDTO: AddCategoryDTO) {
    return this.categoryService.addCategory(addCategoryDTO)
  }

  @Get('data')
  findAllCategories() {
    return this.categoryService.getAllCategories()
  }

  @Get('data/:id')
  findOneCategory(@Param('id') id: number) {
    return this.categoryService.getOneCategory(id)
  }

  @Patch('data/:id')
  updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDTO: UpdateCategoryDTO,
  ) {
    return this.categoryService.updateCategory(id, updateCategoryDTO)
  }

  @Delete('data/:id')
  removeCategory(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id)
  }
}
