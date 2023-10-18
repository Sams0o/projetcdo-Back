import { Injectable, NotFoundException } from '@nestjs/common';
import { Picture } from './entities/picture.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(Picture)
    private picturesRepository: Repository<Picture>,
  ) {}

  async findOne(pictureId: number) {
    const found = await this.picturesRepository.findOne({
      where: { id: pictureId },
    });
    if (!found) {
      throw new NotFoundException(
        `La photo avec l'ID ${pictureId} n'existe pas.`,
      );
    }
    return found;
  }



 
}
