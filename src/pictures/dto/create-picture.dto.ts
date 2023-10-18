import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreatePictureDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  mimetype: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  size: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}
 
