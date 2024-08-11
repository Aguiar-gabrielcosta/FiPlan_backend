import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SetMetadata,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/createUser.dto'
import { UpdateUserDto } from './dto/updateUser.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SetMetadata('isPublic', true)
  @Post('data')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.addUser(createUserDto)
  }

  @Get('data')
  findAll() {
    return this.userService.getAllUsers()
  }

  @Get('data/:id')
  findOne(@Param('id') id: string) {
    return this.userService.getUserById(id)
  }

  @Patch('data/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto)
  }

  @Delete('data/:id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(id)
  }
}
