import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Plan } from './plan.entity'
import { User } from 'src/user/entities/user.entity'

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ type: 'integer' })
  category_id: number

  @Column({ type: 'varchar', length: 50 })
  category: string

  @Column({ type: 'uuid' })
  @ManyToOne(() => Plan)
  @JoinColumn({
    name: 'plan_id',
    referencedColumnName: 'plan_id',
    foreignKeyConstraintName: 'fk_plan_id',
  })
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
  category_budget: number
}
