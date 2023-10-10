import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { CountriesModule } from './countries/countries.module';
import { ContinentsModule } from './continents/continents.module';
import { CategoriesModule } from './categories/categories.module';
import { ClassifyModule } from './classify/classify.module';
import { AssociateModule } from './associate/associate.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: [`.env`] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [],
      synchronize: false,
    }),
    AuthModule,
    UsersModule,
    ExperiencesModule,
    CountriesModule,
    ContinentsModule,
    CategoriesModule,
    ClassifyModule,
    AssociateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
