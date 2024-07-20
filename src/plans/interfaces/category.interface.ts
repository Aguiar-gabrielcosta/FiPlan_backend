import { UUID } from 'crypto'

export default interface Category {
  category: string
  budgetId: UUID
  categoryBudget: number
}
