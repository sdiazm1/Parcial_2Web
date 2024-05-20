/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { SocioService } from './socio2.service';
import { Socio } from './entities/socio2/socio2.entity';

@Controller('socio2/members') // Ruta base para los endpoints de socio
export class Socio2Controller {
  constructor(private readonly socioService: SocioService) {}

  @Get()
  findAll(): Promise<Socio[]> {
    return this.socioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Socio> {
    return this.socioService.findOne(+id);
  }

  @Post()
  create(@Body() socio: Socio): Promise<Socio> {
    return this.socioService.create(socio);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() socio: Socio): Promise<Socio> {
    return this.socioService.update(id, socio);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.socioService.remove(+id);
  }
}
