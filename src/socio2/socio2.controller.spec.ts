import { Test, TestingModule } from '@nestjs/testing';
import { Socio2Controller } from './socio2.controller';

describe('Socio2Controller', () => {
  let controller: Socio2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Socio2Controller],
    }).compile();

    controller = module.get<Socio2Controller>(Socio2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
