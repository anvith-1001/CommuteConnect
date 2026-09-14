import { IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { InterestStatus } from '../../database/entities';

export class DecisionDto {
  @ApiProperty({
    example: InterestStatus.ACCEPTED,
    enum: [InterestStatus.ACCEPTED, InterestStatus.DECLINED],
    description: 'The commute owner’s decision for a pending interest.',
  })
  @IsIn([InterestStatus.ACCEPTED, InterestStatus.DECLINED])
  status: InterestStatus.ACCEPTED | InterestStatus.DECLINED;
}