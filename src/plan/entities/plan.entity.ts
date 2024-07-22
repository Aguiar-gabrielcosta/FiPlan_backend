import { User } from 'src/user/entities/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity()
export class Plan {
  @PrimaryColumn({ type: 'uuid' })
  plan_id: string

  @Column({ type: 'uuid' })
  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'user_id',
    foreignKeyConstraintName: 'fk_user_id',
  })
  user_id: string

  @Column({ type: 'money' })
  budget_value: number

  @Column({ type: 'date' })
  start_date: Date

  @Column({ type: 'date' })
  end_date: Date
}
