import { ForbiddenException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/createUser.dto'
import { UpdateUserDto } from './dto/updateUser.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { randomUUID } from 'crypto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async addUser(createUserDto: CreateUserDto): Promise<{ user_id: string }> {
    const duplicate = await this.userRepository.existsBy({
      username: createUserDto.username,
    })

    if (duplicate) {
      throw new ForbiddenException()
    }

    const user: User = new User()
    user.user_id = randomUUID()
    user.username = createUserDto.username
    user.password = await bcrypt.hash(createUserDto.password, 10)
    await this.userRepository.save(user)
    return { user_id: user.user_id }
  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find()
  }

  getUserById(user_id: string) {
    return this.userRepository.findOneBy({ user_id })
  }

  getUserByUsername(username: string) {
    return this.userRepository.findOneBy({ username })
  }

  updateUser(user_id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(user_id, {
      username: updateUserDto.username,
      password: updateUserDto.password,
    })
  }

  deleteUser(user_id: string): Promise<{ affected?: number }> {
    return this.userRepository.delete(user_id)
  }
}
