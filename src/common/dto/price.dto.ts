import { ApiProperty } from '@nestjs/swagger';

import { BaseDto } from './base.dto';

export class PriceDto extends BaseDto {
  @ApiProperty()
  cheeseCoin: number;
}
