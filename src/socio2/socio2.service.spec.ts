/* eslint-disable prettier/prettier */ 
import { Test, TestingModule } from '@nestjs/testing';
import { SocioService } from './socio2.service';
import { Socio } from './entities/socio2/socio2.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const socioArray = [
  new Socio(),
  new Socio(),
];

socioArray[0].id = 1;
socioArray[0].username = 'Socio 1';
socioArray[0].email = 'socio1@example.com';
socioArray[0].dateOfBirth = new Date();

socioArray[1].id = 2;
socioArray[1].username = 'Socio 2';
socioArray[1].email = 'socio2@example.com';
socioArray[1].dateOfBirth = new Date();

const oneSocio = new Socio();
oneSocio.id = 1;
oneSocio.username = 'Socio 1';
oneSocio.email = 'socio1@example.com';
oneSocio.dateOfBirth = new Date();

describe('SocioService', () => {
  let service: SocioService;
  let repo: Repository<Socio>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SocioService,
        {
          provide: getRepositoryToken(Socio),
          useValue: {
            find: jest.fn().mockResolvedValue(socioArray),
            findOne: jest.fn().mockResolvedValue(oneSocio), // Aquí se utiliza findOne sin argumentos
            save: jest.fn().mockResolvedValue(oneSocio),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SocioService>(SocioService);
    repo = module.get<Repository<Socio>>(getRepositoryToken(Socio));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all socios', async () => {
    const socios = await service.findAll();
    expect(socios).toEqual(socioArray);
  });

  it('should get a single socio', async () => {
    const repoSpy = jest.spyOn(repo, 'findOne');
    const socio = await service.findOne(1); // Asegúrate de no pasar argumentos aquí
    expect(socio).toEqual(oneSocio);
    expect(repoSpy).toBeCalledWith({ where: { id: 1 } }); // Si necesitas verificar qué argumento se está pasando al repositorio
  });
  

  it('should create a new socio', async () => {
    const createSocioDto: Partial<Socio> = { 
      username: 'NombreUsuario', 
      email: 'correo@ejemplo.com', 
      dateOfBirth: new Date('1990-01-01') 
    };    
    const newSocio = await service.create(createSocioDto);
    expect(newSocio).toEqual(oneSocio);
  });

  it('should update a socio', async () => {
    const updateSocioDto = { username: 'Updated Socio' };
    const updatedSocio = await service.update(1, updateSocioDto);
    expect(updatedSocio).toEqual(oneSocio);
  });  

  it('should delete a socio', async () => {
    const repoSpy = jest.spyOn(repo, 'remove');
    await service.remove(1);
    expect(repoSpy).toBeCalledWith(oneSocio);
  });
});
