import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { Role } from 'src/roles/roles.model';

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

  async addRole(dto: AddRoleDto) {
    const user = await User.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (user && role) {
      user.$add('role', role.id)
      return dto;
    }

    throw new HttpException('User or Role not found', HttpStatus.NOT_FOUND)

  }
  async ban(dto: BanUserDto) {
    const user = await User.findByPk(dto.userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }
}
