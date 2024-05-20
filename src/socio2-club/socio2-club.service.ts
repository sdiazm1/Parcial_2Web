/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Socio } from '../socio2/entities/socio2/socio2.entity';
import { Club } from '../club/entities/club/club.entity';

@Injectable()
export class SocioClubService {
  constructor(
    @InjectRepository(Socio)
    private readonly socioRepository: Repository<Socio>,
    @InjectRepository(Club)
    private readonly clubRepository: Repository<Club>,
  ) {}

  async addMemberToClub(clubId: number, socioId: number): Promise<void> {
    const club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['socios'],
    });
    const socio = await this.socioRepository.findOneBy({ id: socioId });

    if (!club || !socio) {
      throw new NotFoundException('Club or Socio not found');
    }

    club.socios.push(socio);
    await this.clubRepository.save(club);
  }

  async findMembersFromClub(clubId: number): Promise<Socio[]> {
    const club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['socios'],
    });

    if (!club) {
      throw new NotFoundException('Club not found');
    }

    return club.socios;
  }

  async findMemberFromClub(clubId: number, socioId: number): Promise<Socio> {
    const club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['socios'],
    });

    if (!club) {
      throw new NotFoundException('Club not found');
    }

    const socio = club.socios.find((s) => s.id === socioId);

    if (!socio) {
      throw new NotFoundException('Socio not found in this Club');
    }

    return socio;
  }

  async updateMembersFromClub(clubId: number, socioIds: number[]): Promise<void> {
    const club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['socios'],
    });

    if (!club) {
      throw new NotFoundException('Club not found');
    }

    const socios = await this.socioRepository.findByIds(socioIds);

    if (socios.length !== socioIds.length) {
      throw new NotFoundException('One or more Socios not found');
    }

    club.socios = socios;
    await this.clubRepository.save(club);
  }

  async deleteMemberFromClub(clubId: number, socioId: number): Promise<void> {
    const club = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['socios'],
    });

    if (!club) {
      throw new NotFoundException('Club not found');
    }

    club.socios = club.socios.filter((s) => s.id !== socioId);
    await this.clubRepository.save(club);
  }
}
