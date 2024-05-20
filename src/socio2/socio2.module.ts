/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Socio } from './entities/socio2/socio2.entity';
import { SocioService } from './socio2.service';
import { Socio2Controller } from './socio2.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Socio])],
  providers: [SocioService],
  controllers: [Socio2Controller],
})
export class Socio2Module {}
