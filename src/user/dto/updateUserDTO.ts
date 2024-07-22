import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './createUserDTO'

export class UpdateUserDto extends PartialType(CreateUserDto) {}
