/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from './entities/club/club.entity';
import { ClubService } from './club.service';
import { ClubController } from './club.controller';
import { SocioClubService } from '../socio2-club/socio2-club.service';
import { SocioClubController } from '../socio2-club/socio2-club.controller';
import { Socio } from '../socio2/entities/socio2/socio2.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Club,Socio]), 
  ],
  controllers: [ClubController, SocioClubController],
  providers: [ClubService, SocioClubService],
})
export class ClubModule {}
