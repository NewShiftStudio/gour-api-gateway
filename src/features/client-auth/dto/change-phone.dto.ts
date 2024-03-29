import { IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePhoneDto {
  @ApiProperty()
  @IsPhoneNumber()
  phone: string;
}
