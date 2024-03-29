import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { firstValueFrom } from 'rxjs';

import { BaseGetListDto } from '../../common/dto/base-get-list.dto';
import { CityDto } from '../../common/dto/city.dto';
import { CityCreateDto } from './dto/city-create.dto';
import { CityUpdateDto } from './dto/city-update.dto';
import { TOTAL_COUNT_HEADER } from '../../constants/httpConstants';
import { AuthGuard } from '../../common/guards/auth.guard';

@ApiTags('cities')
@Controller('cities')
export class CityController {
  constructor(@Inject('MAIN_SERVICE') private client: ClientProxy) {}

  async onModuleInit() {
    await this.client.connect();
  }

  @ApiOkResponse({
    type: [CityDto],
  })
  @HttpCode(HttpStatus.OK)
  @Get('/')
  async getAll(@Query() params: BaseGetListDto, @Res() res: Response) {
    const [cities, count] = await firstValueFrom(
      this.client.send('get-cities', params),
      { defaultValue: [[], 0] },
    );

    res.set(TOTAL_COUNT_HEADER, count.toString());

    return res.send(cities);
  }

  @ApiOkResponse({
    type: CityDto,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getOne(@Param('id') id: string, @Res() res: Response) {
    const city = await firstValueFrom(this.client.send('get-city', +id), {
      defaultValue: null,
    });

    return res.send(city);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    type: CityDto,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  post(@Body() dto: CityCreateDto) {
    return this.client.send('create-city', dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    type: CityDto,
  })
  @HttpCode(HttpStatus.OK)
  @Put('/:id')
  put(@Param('id') id: string, @Body() dto: CityUpdateDto) {
    return this.client.send('edit-city', { id: +id, dto });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.client.send('delete-city', +id);
  }
}
