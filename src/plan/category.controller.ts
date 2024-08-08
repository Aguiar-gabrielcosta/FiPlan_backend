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
import { AddCategoryBatchDTO } from './dto/addCategoryBatch.dto'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post('data')
  createCategory(@Body() addCategoryDTO: AddCategoryDTO) {
    return this.categoryService.addCategory(addCategoryDTO)
  }

  @Post('data/batch')
  addCategoryBatch(@Body() addCategoryBatchDTO: AddCategoryBatchDTO) {
    return this.categoryService.addCategoryBatch(addCategoryBatchDTO)
  }

  @Get('data')
  findAllCategories() {
    return this.categoryService.getAllCategories()
  }

  @Get('data/:id')
  findOneCategory(@Param('id') id: number) {
    return this.categoryService.getCategoryById(id)
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

  @Get('/progress/:userid/:planid')
  getCategoriesProgress(
    @Param('userid') user_id: string,
    @Param('planid') plan_id: string,
  ) {
    return this.categoryService.getCategoriesProgress(user_id, plan_id)
  }

  @Get('/plan/:id')
  getPlanCategories(@Param('id') plan_id: string) {
    return this.categoryService.getAllPlanCategories(plan_id)
  }

  @Get(':id')
  getUserCategories(@Param('id') user_id: string) {
    return this.categoryService.getAllUserCategories(user_id)
  }
}
