/* eslint-disable prettier/prettier */
import { Controller, Param, ParseIntPipe, Post, Get, Patch, Delete, Body, HttpException, HttpStatus } from '@nestjs/common';
import { SocioClubService } from './socio2-club.service';
import { Socio } from 'src/socio2/entities/socio2/socio2.entity';

@Controller('clubs/:clubId/socios')
export class SocioClubController {
  constructor(private readonly socioClubService: SocioClubService) {}

  @Post(':socioId')
  async addMemberToClub(
    @Param('clubId', ParseIntPipe) clubId: number,
    @Param('socioId', ParseIntPipe) socioId: number,
  ): Promise<void> {
    try {
      await this.socioClubService.addMemberToClub(clubId, socioId);
    } catch (error) {
      throw new HttpException('Error al agregar socio al club', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findMembersFromClub(@Param('clubId', ParseIntPipe) clubId: number): Promise<Socio[]> {
    return this.socioClubService.findMembersFromClub(clubId);
  }

  @Get(':socioId')
  async findMemberFromClub(
    @Param('clubId', ParseIntPipe) clubId: number,
    @Param('socioId', ParseIntPipe) socioId: number,
  ): Promise<Socio> {
    const member = await this.socioClubService.findMemberFromClub(clubId, socioId);
    if (!member) {
      throw new HttpException('Socio no encontrado en este club', HttpStatus.NOT_FOUND);
    }
    return member;
  }

  @Patch()
  async updateMembersFromClub(
    @Param('clubId', ParseIntPipe) clubId: number,
    @Body() body: { socioIds: number[] },
  ): Promise<void> {
    await this.socioClubService.updateMembersFromClub(clubId, body.socioIds);
  }

  @Delete(':socioId')
  async deleteMemberFromClub(
    @Param('clubId', ParseIntPipe) clubId: number,
    @Param('socioId', ParseIntPipe) socioId: number,
  ): Promise<void> {
    await this.socioClubService.deleteMemberFromClub(clubId, socioId);
  }
}