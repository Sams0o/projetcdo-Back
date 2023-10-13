import { Injectable } from '@nestjs/common';
import { Continent } from './entities/continent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContinentsService {
  constructor(
    @InjectRepository(Continent)
    private restrictionsRepository: Repository<Continent>,
  ) {}

  findAll() {
    return this.restrictionsRepository.find();
  }
}
