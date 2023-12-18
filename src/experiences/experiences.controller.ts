import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Experience } from './entities/experience.entity';

@Controller('experiences')
@ApiTags('Experiences Controller')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createExperienceDto: CreateExperienceDto,
    @GetUser() user: User,
  ): Promise<Experience> {
    return this.experiencesService.create(createExperienceDto, user.id);
  }

  @Get() //Recherche toutes les expériences associés à l'utilisateur connecté
  @UseGuards(AuthGuard('jwt'))
  findExperienceByIdUser(@GetUser() user: User): Promise<Experience[]> {
    return this.experiencesService.findExperienceByIdUser(user.id);
  }

  @Get('all')
  findAll() {
    return this.experiencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.experiencesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updateExperienceDto: UpdateExperienceDto,
    @GetUser() user: User,
  ) {
    return this.experiencesService.update(+id, updateExperienceDto, user.id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.experiencesService.remove(+id, user.id);
  }
}
