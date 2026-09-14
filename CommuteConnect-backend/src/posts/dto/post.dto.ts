import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  Matches,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../common/pagination.dto';

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

const vehicleNumber = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim().toUpperCase() : value;

export class SavePostDto {
  @ApiProperty({
    example: 'Indiranagar',
    description: 'Pickup area, landmark, or city.',
    minLength: 2,
    maxLength: 120,
  })
  @Transform(trim)
  @IsString()
  @Length(2, 120, { message: 'Origin must contain between 2 and 120 characters.' })
  origin: string;

  @ApiProperty({
    example: 'Whitefield',
    description: 'Destination area, landmark, or city.',
    minLength: 2,
    maxLength: 120,
  })
  @Transform(trim)
  @IsString()
  @Length(2, 120, { message: 'Destination must contain between 2 and 120 characters.' })
  destination: string;

  @ApiPropertyOptional({ example: 'Malleswaram', maxLength: 120 })
  @IsOptional()
  @Transform(trim)
  @IsString()
  @MaxLength(120)
  via?: string;

  @ApiProperty({ example: 12.9784, minimum: -90, maximum: 90 })
  @IsNumber()
  @Min(-90)
  @Max(90)
  originLat: number;

  @ApiProperty({ example: 77.6408, minimum: -180, maximum: 180 })
  @IsNumber()
  @Min(-180)
  @Max(180)
  originLng: number;

  @ApiProperty({ example: 12.9698, minimum: -90, maximum: 90 })
  @IsNumber()
  @Min(-90)
  @Max(90)
  destinationLat: number;

  @ApiProperty({ example: 77.75, minimum: -180, maximum: 180 })
  @IsNumber()
  @Min(-180)
  @Max(180)
  destinationLng: number;

  @ApiPropertyOptional({ example: 13.0035, minimum: -90, maximum: 90 })
  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  viaLat?: number;

  @ApiPropertyOptional({ example: 77.5648, minimum: -180, maximum: 180 })
  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  viaLng?: number;

  @ApiProperty({
    example: '2030-06-15T08:30:00+05:30',
    description: 'Future departure date and time including its UTC offset.',
    format: 'date-time',
  })
  @IsDateString({ strict: true })
  @Matches(/(Z|[+-]\d{2}:\d{2})$/, { message: 'Departure must include a timezone.' })
  departureAt: string;

  @ApiProperty({
    example: 3,
    description: 'Total passenger seats offered.',
    minimum: 1,
    maximum: 8,
  })
  @IsInt()
  @Min(1)
  @Max(8)
  seats: number;

  @ApiProperty({
    example: 'KA01AB1234',
    description: 'Vehicle registration number using letters and numbers.',
    minLength: 4,
    maxLength: 20,
    pattern: '^[A-Z0-9]{4,20}$',
  })
  @Transform(vehicleNumber)
  @IsString()
  @Matches(/^[A-Z0-9]{4,20}$/, {
    message: 'Vehicle number must contain 4–20 letters and numbers.',
  })
  vehicleNumber: string;

  @ApiPropertyOptional({
    example: 'Meet beside the metro entrance.',
    description: 'Optional pickup or commute information.',
    maxLength: 1000,
    default: '',
  })
  @ValidateIf((_object, value) => value !== undefined)
  @Transform(trim)
  @IsString()
  @MaxLength(1000)
  notes = '';
}

export class UpdatePostDto {
  @ApiProperty({
    example: 3,
    description: 'Total passenger seats offered.',
    minimum: 1,
    maximum: 8,
  })
  @IsInt()
  @Min(1)
  @Max(8)
  seats: number;
}

export class SearchPostsDto extends PaginationDto {
  @ApiPropertyOptional({
    example: 'Indiranagar',
    description: 'Fuzzy origin search.',
    maxLength: 120,
  })
  @IsOptional()
  @Transform(trim)
  @IsString()
  @MaxLength(120)
  origin?: string;

  @ApiPropertyOptional({
    example: 'Whitefield',
    description: 'Fuzzy destination search.',
    maxLength: 120,
  })
  @IsOptional()
  @Transform(trim)
  @IsString()
  @MaxLength(120)
  destination?: string;
}