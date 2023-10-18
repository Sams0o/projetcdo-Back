import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  findAll() {
    return this.categoriesRepository.find();
  }

  async findOne(categoryId: number) {
    const found = await this.categoriesRepository.findOne({
      where: { id: categoryId },
    });
    if (!found) {
      throw new NotFoundException(
        `L'expérience avec l'ID ${categoryId} n'existe pas.`,
      );
    }
    return found;
  }
}
