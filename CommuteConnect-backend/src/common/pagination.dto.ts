import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'One-based page number.',
    default: 1,
    minimum: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @ApiPropertyOptional({
    example: 12,
    description: 'Number of records returned per page.',
    default: 12,
    minimum: 1,
    maximum: 50,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit = 12;
}

export class HistoryDto extends PaginationDto {
  @ApiPropertyOptional({
    example: 'current',
    description: 'Select current activity or historical records.',
    enum: ['current', 'history'],
    default: 'current',
  })
  @IsOptional()
  @IsIn(['current', 'history'])
  view: 'current' | 'history' = 'current';
}

export function pageResult<T>(data: T[], total: number, q: PaginationDto) {
  return {
    data,
    total,
    page: q.page,
    limit: q.limit,
    totalPages: Math.ceil(total / q.limit),
  };
}