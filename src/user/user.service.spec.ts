import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'

describe('UserService', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile()

    service = module.get<UserService>(UserService)
  })
})
