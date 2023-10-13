import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive, IsString, Max, Min } from "class-validator";

export class CreateCountryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(6)
  continent_id: number;
}
