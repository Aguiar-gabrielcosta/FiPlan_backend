import { UUID } from 'crypto'

export class AddExpenseDTO {
  transactionValue: number
  category: string
  date: Date
  userId: UUID
}
