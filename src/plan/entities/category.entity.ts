import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Category {
  @PrimaryColumn({ type: 'integer' })
  category_id: number

  @Column({ type: 'varchar', length: 50 })
  category: string

  @Column({ type: 'uuid' })
  plan_id: string

  @Column({ type: 'numeric' })
  category_budget: number
}
