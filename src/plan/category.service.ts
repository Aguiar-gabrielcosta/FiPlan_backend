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

  addCategory(addCategoryDTO: AddCategoryDTO): Promise<Category> {
    const category = new Category()
    category.category = addCategoryDTO.category
    category.plan_id = addCategoryDTO.plan_id
    category.category_budget = addCategoryDTO.category_budget
    return this.categoryRepository.save(category)
  }

  getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find()
  }

  getOneCategory(category: string): Promise<Category> {
    return this.categoryRepository.findOneBy({ category })
  }

  updateCategory(
    category: string,
    updateCategoryDTO: UpdateCategoryDTO,
  ): Promise<Category> {
    const newCategory = new Category()
    newCategory.category = category
    newCategory.plan_id = updateCategoryDTO.plan_id
    newCategory.category_budget = updateCategoryDTO.category_budget
    return this.categoryRepository.save(newCategory)
  }

  deleteCategory(category: string): Promise<{ affected?: number }> {
    return this.categoryRepository.delete({ category })
  }
}
