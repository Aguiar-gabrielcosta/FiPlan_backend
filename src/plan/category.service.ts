import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'
import { Category } from './entities/category.entity'
import { AddCategoryDTO } from './dto/addCategory.dto'
import { UpdateCategoryDTO } from './dto/updateCategory.dto'
import { AddCategoryBatchDTO } from './dto/addCategoryBatch.dto'

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
    category.user_id = addCategoryDTO.user_id
    category.category_budget = addCategoryDTO.category_budget
    const res = await this.categoryRepository.save(category)
    return { category_id: res.category_id }
  }

  getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find()
  }

  getCategoryById(category_id: number): Promise<Category> {
    return this.categoryRepository.findOneBy({ category_id })
  }

  updateCategory(
    category_id: number,
    updateCategoryDTO: UpdateCategoryDTO,
  ): Promise<UpdateResult> {
    const newCategory = new Category()
    newCategory.category = updateCategoryDTO.category
    newCategory.plan_id = updateCategoryDTO.plan_id
    newCategory.user_id = updateCategoryDTO.user_id
    newCategory.category_budget = updateCategoryDTO.category_budget
    return this.categoryRepository.update(category_id, newCategory)
  }

  deleteCategory(category_id: number): Promise<{ affected?: number }> {
    return this.categoryRepository.delete({ category_id })
  }

  // Recupera todas as categorias de um usuário
  getAllUserCategories(user_id: string): Promise<Category[]> {
    return this.categoryRepository.find({
      select: {
        category_id: true,
        plan_id: true,
        category: true,
        category_budget: true,
      },
      where: { user_id },
    })
  }

  // Adiciona um array de categorias ao banco
  async addCategoryBatch(addCategoryBatchDTO: AddCategoryBatchDTO) {
    // Cria um array de categorias para ser inserido no banco
    const categories = addCategoryBatchDTO.categories.map((categoryData) => {
      const category = new Category()
      category.user_id = categoryData.user_id
      category.plan_id = categoryData.plan_id
      category.category = categoryData.category
      category.category_budget = categoryData.category_budget
      return category
    })

    // Insere as categorias
    const res = await this.categoryRepository.save(categories)

    // Retorna os IDs
    const ids = res.map((item) => {
      return {
        category_id: item.category_id,
      }
    })
    return ids
  }

  // Recupera o progresso das categorias de um plano
  async getCategoriesProgress(
    user_id: string,
    plan_id: string,
  ): Promise<
    {
      category_id: number
      category: string
      categor_budget: number
      total_expenses: number
      progress: number
    }[]
  > {
    const data = await this.categoryRepository.query(`
        SELECT category.category_id, category.category, COALESCE(SUM("transaction".transaction_value), 0) AS total_expenses, category.category_budget FROM category
        LEFT JOIN "transaction" ON category.category_id = "transaction".category_id AND "transaction".transaction_type = 'expense'
        WHERE category.user_id = '${user_id}'
        AND category.plan_id = '${plan_id}'
        GROUP BY category.category_id
        ORDER BY category_budget DESC;
      `)

    const categoriesProgress = data.map((item) => {
      return {
        progress: parseFloat(
          (item.total_expenses / item.category_budget).toFixed(2),
        ),
        ...item,
      }
    })

    return categoriesProgress
  }
}
