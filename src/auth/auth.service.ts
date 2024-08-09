import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import * as bcrypt from 'bcrypt'
import { SignInDTO } from './dto/signIn.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDTO: SignInDTO): Promise<any> {
    const user = await this.userService.getUserByUsername(signInDTO.username)

    const checkPW = await bcrypt.compare(signInDTO.password, user.password)

    console.log(checkPW)

    if (!checkPW) {
      throw new UnauthorizedException()
    }

    const payload = { sub: user.user_id, username: user.username }

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
