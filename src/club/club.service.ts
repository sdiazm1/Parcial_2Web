/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from './entities/club/club.entity';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
  ) {}

  async findAll(): Promise<Club[]> {
    return this.clubRepository.find();
  }

  async findOne(id: number): Promise<Club> {
    const club = await this.clubRepository.findOneBy({ id });
    if (!club) {
      throw new NotFoundException('Club no encontrado');
    }
    return club;
  }

  async create(clubData: Partial<Club>): Promise<Club> {
    if (clubData.description.length > 100) {
      throw new BadRequestException('La descripción no puede superar los 100 caracteres');
    }
    const club = this.clubRepository.create(clubData);
    return this.clubRepository.save(club);
  }

  async update(id: number, clubData: Partial<Club>): Promise<Club> {
    const club = await this.findOne(id);
    if (clubData.description.length > 100) {
      throw new BadRequestException('La descripción no puede superar los 100 caracteres');
    }
    this.clubRepository.merge(club, clubData);
    return this.clubRepository.save(club);
  }

  async remove(id: number): Promise<void> {
    const club = await this.findOne(id);
    await this.clubRepository.remove(club);
  }
}
