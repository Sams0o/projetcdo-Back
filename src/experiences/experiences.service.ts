import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExperiencesService {
  constructor(
    @InjectRepository(Experience)
    private experiencesRepository: Repository<Experience>,
  ) {}

  async create(
    createExperienceDto: CreateExperienceDto, user_id: number,): Promise<Experience> {
    const experience = this.experiencesRepository.create(createExperienceDto);
    experience.user_id = user_id;
    const result = await this.experiencesRepository.save(experience);
    return result;
  }

  async findExperienceByIdUser(user_id: number): Promise<Experience[]> {
    const found = await this.experiencesRepository.find({ where: { user_id } });

    if (!found) {
      throw new NotFoundException(
        `Aucune experience n'a été retrouvé pour cet utilisateur.`,
      );
    }
    return found;
  }

    findAll() {
    return this.experiencesRepository.find();
  }

  async findOne(experienceId: number) {
    const found = await this.experiencesRepository.findOne({
      where: { id: experienceId },
    });
    if (!found) {
      throw new NotFoundException(
        `L'expérience avec l'ID ${experienceId} n'existe pas.`,
      );
    }
    return found;
  }

  async update(
    experienceId: number,
    updateExperienceDto: UpdateExperienceDto,
    userId: number,
  ) {
    console.log('User ID:', userId);
    const experience = await this.findOne(experienceId);

    if (experience.user_id !== userId) {
      throw new ForbiddenException(
        `Vous n'avez pas les droits pour modifier cette expérience.`,
      );
    }

    if (updateExperienceDto.countries) {
      experience.countries = updateExperienceDto.countries;
    }

    if (updateExperienceDto.categories) {
      experience.categories = updateExperienceDto.categories;
    }
    const updatedExperience = this.experiencesRepository.merge(
      experience,
      updateExperienceDto,
    );
    const result = await this.experiencesRepository.save(updatedExperience);
    return result;
  }

  async remove(experienceId: number, userId: number) {
    const experience = await this.experiencesRepository.findOne({
      where: { id: experienceId },
    });

    if (experience.user_id !== userId) {
      throw new ForbiddenException(
        `Vous n'avez pas les droits pour supprimer cette expérience.`,
      );
    }

    return this.experiencesRepository.remove(experience);
  }
}
