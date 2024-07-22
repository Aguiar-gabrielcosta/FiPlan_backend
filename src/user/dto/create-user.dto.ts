import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'Deve conter pelo menos 2 digitos.' })
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  @MinLength(8, { message: 'Deve conter no mínimo 8 digitos.' })
  password: string
}
