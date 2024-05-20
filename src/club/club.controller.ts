/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ClubService } from './club.service';
import { Club } from './entities/club/club.entity';

@Controller('clubs') // Ruta base para los endpoints de club
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Get()
  findAll(): Promise<Club[]> {
    return this.clubService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Club> {
    return this.clubService.findOne(+id);
  }

  @Post()
  create(@Body() club: Club): Promise<Club> {
    return this.clubService.create(club);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() club: Club): Promise<Club> {
    return this.clubService.update(+id, club);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.clubService.remove(+id);
  }
}

