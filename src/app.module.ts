/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClubModule } from './club/club.module';
import { Club } from './club/entities/club/club.entity';
import { Socio2Module } from './socio2/socio2.module';
import { Socio } from './socio2/entities/socio2/socio2.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'test',
      password: 'test',
      database: 'test',
      entities: [Socio,Club],
      synchronize: true,
    }),
    ClubModule,
    Socio2Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

