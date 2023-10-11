import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    ) {}

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    const found = await this.usersRepository.findOneBy({id});
    if(!found) {
      throw new NotFoundException(
        `L'utilisateur avec l'id ${id} n'existe pas.`,
      );
    }
    return found;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
