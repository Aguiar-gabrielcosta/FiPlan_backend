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

  @Column({ type: 'varchar', length: 50, nullable: true })
  category: string | null

  @Column({ type: 'text', enum: ['expense', 'income'] })
  transaction_type: 'expense' | 'income'

  @Column({ type: 'numeric' })
  transaction_value: number

  @Column({ type: 'date' })
  transaction_date: Date
}
