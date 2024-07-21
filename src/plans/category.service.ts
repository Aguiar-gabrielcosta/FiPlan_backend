import { Injectable } from '@nestjs/common'
import { DataTempService } from 'src/database/data.service'
import Category from 'src/database/interfaces/category.interface'

@Injectable()
export class CategoryService {
  getAllCategoryData(): Category[] {
    return new DataTempService().getAllCategoryData()
  }
}
