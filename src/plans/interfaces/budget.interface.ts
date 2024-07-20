import { UUID } from 'crypto'

export default interface Budget {
  budgetId: UUID
  userId: UUID
  budgetValue: number
  startDate: Date
  endDate: Date
}
