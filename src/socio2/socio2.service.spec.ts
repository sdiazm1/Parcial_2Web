import { Test, TestingModule } from '@nestjs/testing';
import { Socio2Service } from './socio2.service';

describe('Socio2Service', () => {
  let service: Socio2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Socio2Service],
    }).compile();

    service = module.get<Socio2Service>(Socio2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
