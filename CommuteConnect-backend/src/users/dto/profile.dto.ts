import { Transform } from 'class-transformer';
import { IsEnum, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Sex } from '../../database/entities';

export class UpdateProfileDto {
  @ApiProperty({
    example: 'Anvith DB',
    minLength: 2,
    maxLength: 100,
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @Length(2, 100, { message: 'Name must contain between 2 and 100 characters.' })
  name: string;

  @ApiProperty({
    example: '1995-06-15',
    format: 'date',
  })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Enter your date of birth as YYYY-MM-DD.' })
  dob: string;

  @ApiProperty({
    example: Sex.UNDISCLOSED,
    enum: Sex,
    enumName: 'Sex',
  })
  @IsEnum(Sex, { message: 'Choose a valid sex option.' })
  sex: Sex;
}

export class DeleteAccountDto {
  @ApiProperty({
    example: 'a-secure-passphrase',
    description: 'Current password required to confirm permanent account deletion.',
    format: 'password',
    maxLength: 128,
  })
  @IsString()
  @Length(1, 128)
  password: string;
}