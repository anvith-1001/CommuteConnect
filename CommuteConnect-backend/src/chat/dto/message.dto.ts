import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({
    example: 'I can meet beside the metro entrance.',
    description: 'Message visible only to the driver and this accepted passenger.',
    minLength: 1,
    maxLength: 1000,
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @Length(1, 1000, { message: 'Message must contain between 1 and 1000 characters.' })
  body: string;
}