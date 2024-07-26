import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ type: 'integer' })
  category_id: number

  @Column({ type: 'varchar', length: 50 })
  category: string

  @Column({ type: 'uuid' })
  plan_id: string

  @Column({ type: 'numeric' })
  category_budget: number
}
