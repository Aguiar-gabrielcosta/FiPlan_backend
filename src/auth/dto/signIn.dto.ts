import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class SignInDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Deve conter pelo menos 2 digitos.' })
  username: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Deve conter no mínimo 8 digitos.' })
  password: string
}
