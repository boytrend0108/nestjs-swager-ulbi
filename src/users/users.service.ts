import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    private roleService: RolesService
  ) { }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('ADMIN');
    await user.$set('roles', [role.id]);
    user.roles = [role]
    return user;
  }

  async getAllUsers() {
    const users = this.userRepository.findAll({ include: { all: true } });

    return users;
  }

  async getUsersByEmail(email: string) {
    const user = this.userRepository.findOne({ where: { email }, include: { all: true } });
    return user;
  }
}
