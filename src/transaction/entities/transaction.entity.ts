import { Category } from 'src/plan/entities/category.entity'
import { User } from 'src/user/entities/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity()
export class Transaction {
  @PrimaryColumn({ type: 'uuid' })
  transaction_id: string

  @Column({ type: 'uuid' })
  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'user_id',
    foreignKeyConstraintName: 'fk_user_id',
  })
  user_id: string

  @Column({ type: 'integer' })
  @ManyToOne(() => Category)
  @JoinColumn({
    name: 'category_id',
    referencedColumnName: 'category_id',
    foreignKeyConstraintName: 'fk_category_id',
  })
  category_id: number

  @Column({ type: 'text', enum: ['expense', 'income'] })
  transaction_type: 'expense' | 'income'

  @Column({ type: 'numeric' })
  transaction_value: number

  @Column({ type: 'timestamp with time zone' })
  transaction_date: string
}
