import {
  IsArray,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  ApiModelProperty,
  ApiModelPropertyOptional,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { TranslatableStringCreateDto } from '../../../common/dto/translatable-string-create.dto';
import { TranslatableTextCreateDto } from '../../../common/dto/translatable-text-create.dto';
import { MetaCreateDto } from '../../../common/dto/meta-create.dto';
import { RoleDiscountDto } from 'src/common/dto/role-discount.dto';
import { PriceDto } from 'src/common/dto/price.dto';

export class ProductCreateDto {
  @ValidateNested()
  @ApiProperty()
  @IsNotEmptyObject()
  @IsObject()
  @Type(() => TranslatableStringCreateDto)
  title: TranslatableStringCreateDto;

  @ValidateNested()
  @ApiProperty()
  @IsNotEmptyObject()
  @IsObject()
  @Type(() => TranslatableTextCreateDto)
  description: TranslatableTextCreateDto;

  @ApiProperty()
  @IsString()
  moyskladId: string;

  @IsArray()
  @ApiModelProperty({
    type: Number,
    isArray: true,
  })
  @IsOptional()
  @ApiPropertyOptional()
  images?: number[];

  @IsArray()
  @ApiModelProperty({
    type: Number,
    isArray: true,
  })
  @IsOptional()
  @ApiPropertyOptional()
  categoryIds?: number[];

  @IsArray()
  @ApiPropertyOptional()
  similarProducts?: number[];

  @ValidateNested()
  @ApiProperty()
  price: PriceDto;

  @ValidateNested()
  @Type(() => MetaCreateDto)
  @IsOptional()
  @ApiPropertyOptional()
  meta?: MetaCreateDto;

  @ApiProperty()
  isWeightGood?: boolean;

  @ApiModelPropertyOptional({
    isArray: true,
    type: RoleDiscountDto,
  })
  @ValidateNested()
  @IsOptional()
  roleDiscounts?: RoleDiscountDto[];
}
