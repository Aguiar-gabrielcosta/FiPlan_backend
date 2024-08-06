import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/createUser.dto'
import { UpdateUserDto } from './dto/updateUser.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { randomUUID } from 'crypto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async addUser(createUserDto: CreateUserDto): Promise<{ user_id: string }> {
    const user: User = new User()
    user.user_id = randomUUID()
    user.username = createUserDto.username
    user.password = createUserDto.password
    await this.userRepository.save(user)
    return { user_id: user.user_id }
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find()
  }

  getUserById(user_id: string) {
    return this.userRepository.findOneBy({ user_id })
  }

  updateUser(user_id: string, updateUserDto: UpdateUserDto) {
    const user: User = new User()
    user.user_id = user_id
    user.username = updateUserDto.username
    user.password = updateUserDto.password
    return this.userRepository.update(user_id, user)
  }

  deleteUser(user_id: string): Promise<{ affected?: number }> {
    return this.userRepository.delete(user_id)
  }
}
