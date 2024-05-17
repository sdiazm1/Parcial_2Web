/* eslint-disable prettier/prettier */
import { Injectable,  BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Socio } from './entities/socio2/socio2.entity';


@Injectable()
export class SocioService {
  constructor(
    @InjectRepository(Socio)
    private socioRepository: Repository<Socio>,
  ) {}

  async findAll(): Promise<Socio[]> {
    return this.socioRepository.find();
  }

  findOne(id: number): Promise<Socio> {
    return this.socioRepository.findOneBy({ id });
  }

  async create(socioData: Partial<Socio>): Promise<Socio> {
    if (!this.isValidEmail(socioData.email)) {
      throw new BadRequestException('Correo electrónico no válido');
    }
    const socio = this.socioRepository.create(socioData);
    return this.socioRepository.save(socio);
  }

  async update(id: number, socioData: Partial<Socio>): Promise<Socio> {
    const socio = await this.findOne(id);
    if (!this.isValidEmail(socioData.email)) {
      throw new BadRequestException('Correo electrónico no válido');
    }
    this.socioRepository.merge(socio, socioData);
    return this.socioRepository.save(socio);
  }

  async remove(id: number): Promise<void> {
    const socio = await this.findOne(id);
    await this.socioRepository.remove(socio);
  }

  private isValidEmail(email: string): boolean {
    return email.includes('@');
  }
}