/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { SocioService } from './socio2.service';
import { Socio } from './entities/socio2/socio2.entity';

@Controller('socio')
export class SocioController {
  constructor(private readonly socioService: SocioService) {}

  @Get()
  findAll(): Promise<Socio[]> {
    return this.socioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Socio> {
    return this.socioService.findOne(+id);
  }

  @Put(':id') 
  update(@Param('id') id: string, @Body() socio: Socio): Promise<Socio> {
    return this.socioService.update(+id, socio);
  }

  @Post()
  create(@Body() socio: Socio): Promise<Socio> {
    return this.socioService.create(socio);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.socioService.remove(+id);
  }
}

