import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from 'src/experiences/entities/experience.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Experience)
    private experiencesRepository: Repository<Experience>,
  ) {}

  async findOne(id: number) {
    console.log('Méthode findOne appelée avec l’ID:', id);
    const found = await this.usersRepository.findOne({
      where: { id: id },
      relations: ['experiences'],
    });
    console.log('Résultat de la requête findOne:', found);

    if (!found) {
      throw new NotFoundException(
        `L'utilisateur avec l'ID ${id} n'existe pas.`,
      );
    }
    return found;
  }

  async update(
    loggedUserId: number,
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    if (loggedUserId !== id) {
      throw new ForbiddenException(
        "Vous ne pouvez pas modifier les informations d'un autre utilisateur.",
      );
    }

    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(
        `L'utilisateur avec l'ID ${id} n'existe pas.`,
      );
    }
    updateUserDto.admin = false;

    const updatedUser = this.usersRepository.merge(user, updateUserDto);
    return await this.usersRepository.save(updatedUser);
  }

  async deleteUser(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id: id },
      relations: ['experiences', 'pictures'],
    });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }

    // Supprimer les entités liées
    await this.experiencesRepository.remove(user.experiences);

    // Supprimer l'utilisateur
    return await this.usersRepository.remove(user);
  }
}
