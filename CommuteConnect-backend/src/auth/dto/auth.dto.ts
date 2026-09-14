import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Sex } from '../../database/entities';

export class LoginDto {
  @ApiProperty({
    example: 'anvith@example.com',
    description: 'Account email address. It is normalized to lowercase.',
    format: 'email',
    maxLength: 254,
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail({}, { message: 'Enter a valid email address.' })
  @Length(3, 254)
  email: string;

  @ApiProperty({
    example: 'a-secure-passphrase',
    description: 'Account password.',
    minLength: 1,
    maxLength: 128,
    format: 'password',
  })
  @IsString()
  @Length(1, 128)
  password: string;
}

export class RegisterDto extends LoginDto {
  @ApiProperty({
    example: 'Anvith DB',
    description: 'Name displayed to commute owners and passengers.',
    minLength: 2,
    maxLength: 100,
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @Length(2, 100, { message: 'Name must contain between 2 and 100 characters.' })
  name: string;

  @ApiProperty({
    example: 'a-secure-passphrase',
    description: 'A password containing between 12 and 128 characters.',
    minLength: 12,
    maxLength: 128,
    format: 'password',
  })
  @IsString()
  @Length(12, 128, { message: 'Use a password between 12 and 128 characters.' })
  declare password: string;

  @ApiProperty({
    example: '1995-06-15',
    description: 'Date of birth in YYYY-MM-DD format.',
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