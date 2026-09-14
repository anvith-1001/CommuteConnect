import { Transform } from 'class-transformer';
import { IsString, IsUUID, Length } from 'class-validator';

export class ChatJoinDto {
  @IsUUID()
  interestId: string;
}

export class ChatSendDto extends ChatJoinDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @Length(1, 1000)
  body: string;
}