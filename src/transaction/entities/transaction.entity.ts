import { Category } from '../../plan/entities/category.entity'
import { User } from '../../user/entities/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity()
export class Transaction {
  @PrimaryColumn({ type: 'uuid' })
  transaction_id: string

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'user_id',
    foreignKeyConstraintName: 'fk_user_id',
  })
  user: User

  @Column({ type: 'uuid' })
  user_id: string

  @ManyToOne(() => Category)
  @JoinColumn({
    name: 'category_id',
    referencedColumnName: 'category_id',
    foreignKeyConstraintName: 'fk_category_id',
  })
  category: Category

  @Column({ type: 'integer' })
  category_id: number

  @Column({ type: 'text' })
  transaction_type: 'expense' | 'income'

  @Column({ type: 'numeric', precision: 10, scale: 3 })
  transaction_value: number

  @Column({ type: 'timestamp with time zone' })
  transaction_date: Date
}
