import { Body, Controller, Post, SetMetadata } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDTO } from './dto/signIn.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SetMetadata('isPublic', true)
  @Post('login')
  signIn(@Body() signInDTO: SignInDTO) {
    return this.authService.signIn(signInDTO)
  }
}
