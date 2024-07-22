import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Category {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  category: string

  @Column({ type: 'uuid' })
  plan_id: string

  @Column({ type: 'money' })
  category_budget: number
}
