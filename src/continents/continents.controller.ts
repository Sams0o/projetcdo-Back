import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContinentsService } from './continents.service';
import { CreateContinentDto } from './dto/create-continent.dto';
import { UpdateContinentDto } from './dto/update-continent.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('continents')
@ApiTags('Continents Controller')
export class ContinentsController {
  constructor(private readonly continentsService: ContinentsService) {}

  @Get()
  findAll() {
    return this.continentsService.findAll();
  }
}
