import { Module } from '@nestjs/common';
import { ContinentsService } from './continents.service';
import { ContinentsController } from './continents.controller';
import { Continent } from './entities/continent.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Continent])],
  controllers: [ContinentsController],
  providers: [ContinentsService],
})
export class ContinentsModule {}
