import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from './entities/category.entity'
import { AddCategoryDTO } from './dto/addCategory.dto'
import { UpdateCategoryDTO } from './dto/updateCategory.dto'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async addCategory(addCategoryDTO: AddCategoryDTO) {
    const category = new Category()
    category.category = addCategoryDTO.category
    category.plan_id = addCategoryDTO.plan_id
    category.category_budget = addCategoryDTO.category_budget
    const res = await this.categoryRepository.save(category)
    return { category_id: res.category_id }
  }

  getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find()
  }

  getOneCategory(category_id: number): Promise<Category> {
    return this.categoryRepository.findOneBy({ category_id })
  }

  updateCategory(
    category_id: number,
    updateCategoryDTO: UpdateCategoryDTO,
  ): Promise<Category> {
    const newCategory = new Category()
    newCategory.category_id = category_id
    newCategory.category = updateCategoryDTO.category
    newCategory.plan_id = updateCategoryDTO.plan_id
    newCategory.category_budget = updateCategoryDTO.category_budget
    return this.categoryRepository.save(newCategory)
  }

  deleteCategory(category_id: number): Promise<{ affected?: number }> {
    return this.categoryRepository.delete({ category_id })
  }
}
