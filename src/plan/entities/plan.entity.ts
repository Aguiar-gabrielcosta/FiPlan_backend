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

  @Column({ type: 'numeric' })
  budget_value: number

  @Column({ type: 'timestamp with time zone' })
  start_date: string

  @Column({ type: 'timestamp with time zone' })
  end_date: string
}
