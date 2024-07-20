import { UUID } from 'crypto'

export default interface Transaction {
  transactionId: UUID
  userId: UUID
  category: string | null
  transactionType: 'expense' | 'income'
  transactionValue: number
  date: Date
}
