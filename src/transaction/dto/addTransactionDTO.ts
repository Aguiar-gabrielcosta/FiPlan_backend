import { UUID } from 'crypto'

export class AddTransactionDTO {
  userId: UUID
  transactionValue: number
  transactionType: 'expense' | 'income'
  category: string | null
  date: Date
}
