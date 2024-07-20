import { UUID } from 'crypto'

export default interface Transaction {
  transactionId: UUID
  userId: UUID
  transactionType: 'expense' | 'income'
  transactionValue: number
  category: string | null
  date: Date
}
