import { Injectable, NotFoundException } from '@nestjs/common';
import { Continent } from './entities/continent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContinentsService {
  constructor(
    @InjectRepository(Continent)
    private continentsRepository: Repository<Continent>,
  ) {}

  findAll() {
    return this.continentsRepository.find();
  }

  async findOne(continentId: number) {
    const found = await this.continentsRepository.findOne({
      where: { id: continentId },
    });
    if (!found) {
      throw new NotFoundException(
        `Le continent avec l'ID ${continentId} n'existe pas.`,
      );
    }
    return found;
  }
}
