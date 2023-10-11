import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive, IsString, isNotEmpty } from "class-validator";

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

  @ApiProperty()
  @IsNotEmpty()
  publication_date: string;

  @ApiProperty()
  @IsNotEmpty()
  travel_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  user_id: number;
}
