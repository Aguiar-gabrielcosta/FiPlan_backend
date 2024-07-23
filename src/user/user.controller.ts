import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/createUserDTO'
import { UpdateUserDto } from './dto/updateUserDTO'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('data')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get('data')
  findAll() {
    return this.userService.findAllUsers()
  }

  @Get('data/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneUser(id)
  }

  @Patch('data/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }

  @Delete('data/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id)
  }
}
