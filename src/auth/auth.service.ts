import { HttpCode, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/user.model';

@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) { }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUsersByEmail(userDto.email);

    if (candidate) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({ ...userDto, password: hashPassword })
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.userService.getUsersByEmail(dto.email);
    const passwordEqual = await bcrypt.compare(dto.password, user.password);

    if (user && passwordEqual) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Wront email or password' })
  }
}
