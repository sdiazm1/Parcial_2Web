/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { Socio2Controller } from './socio2.controller';
import { SocioService} from './socio2.service';

describe('Socio2Controller', () => {
  let controller: Socio2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Socio2Controller],
      providers: [SocioService],
    }).compile();

    controller = module.get<Socio2Controller>(Socio2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
