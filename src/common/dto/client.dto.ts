import { ApiProperty, OmitType } from '@nestjs/swagger';

import { BaseDto } from './base.dto';
import { ClientRoleDto } from './client-role.dto';
import { ProductDto } from './product.dto';
import { CityDto } from './city.dto';
import { ReferralCodeDto } from './referral-code.dto';
import { ImageDto } from './image.dto';
import { OrderProfileDto } from './order-profile.dto';
import { WalletDto } from './wallet.dto';
import { DiscountDto } from './discount.dto';

export class ClientDto extends OmitType(BaseDto, ['id'] as const) {
  @ApiProperty()
  id: string;

  @ApiProperty()
  role: ClientRoleDto;

  @ApiProperty()
  isApproved: boolean;

  @ApiProperty()
  additionalInfo: Record<string, string | number | object>;

  @ApiProperty()
  favorites: ProductDto[];

  @ApiProperty()
  discounts: DiscountDto[];

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  city: CityDto;

  @ApiProperty()
  referralCode: ReferralCodeDto;

  @ApiProperty()
  password: string;

  @ApiProperty()
  avatar: ImageDto;

  @ApiProperty()
  mainOrderProfile: OrderProfileDto;

  @ApiProperty()
  wallet: WalletDto;
}
