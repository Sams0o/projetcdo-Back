import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class CreateContinentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsIn(['AFRIQUE', 'ASIE', 'EUROPE', 'AMÉRIQUE DU NORD', 'AMÉRIQUE DU SUD', 'OCEANIE'])
  name: string;
}
