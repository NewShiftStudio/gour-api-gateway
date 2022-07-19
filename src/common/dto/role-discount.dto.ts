import { ApiProperty } from '@nestjs/swagger';

import { BaseDto } from './base.dto';
import { ClientRoleDto } from './client-role.dto';
import { ProductDto } from './product.dto';

export class RoleDiscountDto extends BaseDto {
  @ApiProperty()
  product: ProductDto;

  @ApiProperty()
  role: ClientRoleDto;

  @ApiProperty()
  value: number;
}
