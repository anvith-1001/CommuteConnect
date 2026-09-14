import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class ExpressInterestDto {
  @ApiPropertyOptional({ example: 12.9784, minimum: -90, maximum: 90 })
  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  pickupLat?: number;

  @ApiPropertyOptional({ example: 77.6408, minimum: -180, maximum: 180 })
  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  pickupLng?: number;
}