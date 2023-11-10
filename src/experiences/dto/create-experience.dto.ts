import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsISO8601, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CategoryDto } from "src/categories/dto/category.dto";
import { CountryDto } from "src/countries/dto/country.dto";
import { Country } from "src/countries/entities/country.entity";
import { Category } from "src/categories/entities/category.entity";

export class CreateExperienceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsISO8601({ strict: true })
  // publication_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsISO8601({ strict: true })
  travel_date: Date;

  @ApiProperty()
  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true }) // Valide chaque élément du tableau
  @Type(() => CountryDto)
  countries: Country[];

  @ApiProperty()
  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true }) // Valide chaque élément du tableau
  @Type(() => CategoryDto)
  categories: Category;
}

