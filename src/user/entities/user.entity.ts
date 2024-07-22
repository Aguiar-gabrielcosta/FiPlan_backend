import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryColumn({})
  user_id: string

  @Column({ type: 'varchar', length: 150 })
  username: string

  @Column({ type: 'text' })
  password: string
}
