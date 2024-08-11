import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class SignInDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Deve conter pelo menos 6 digitos.' })
  username: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Deve conter no mínimo 6 digitos.' })
  password: string
}
