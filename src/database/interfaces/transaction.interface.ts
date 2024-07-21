export default interface Transaction {
  transactionId: string
  userId: string
  category: string | null
  transactionType: 'expense' | 'income'
  transactionValue: number
  date: Date
}
