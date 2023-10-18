import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { Picture } from './entities/picture.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.picturesService.findOne(+id);
  }
}
