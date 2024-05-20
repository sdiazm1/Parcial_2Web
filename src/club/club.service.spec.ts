/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ClubService } from './club.service';
import { Club } from './entities/club/club.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Definir los objetos Club correctamente
const clubArray = [
  { id: 1, name: 'Club 1' },
  { id: 2, name: 'Club 2' },
].map(clubData => Object.assign(new Club(), clubData));

const oneClub = Object.assign(new Club(), { id: 1, name: 'Club 1' });

describe('ClubService', () => {
  let service: ClubService;
  let repo: Repository<Club>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClubService,
        {
          provide: getRepositoryToken(Club),
          useValue: {
            find: jest.fn().mockResolvedValue(clubArray),
            findOne: jest.fn().mockResolvedValue(oneClub), // Usar findOne en lugar de findOneBy
            save: jest.fn().mockResolvedValue(oneClub),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ClubService>(ClubService);
    repo = module.get<Repository<Club>>(getRepositoryToken(Club));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all clubs', async () => {
    const clubs = await service.findAll();
    expect(clubs).toEqual(clubArray);
  });

  it('should get a single club', async () => {
    const repoSpy = jest.spyOn(repo, 'findOne');
    const club = await service.findOne(1);
    expect(club).toEqual(oneClub);
    expect(repoSpy).toBeCalledWith({ id: 1 });
  });

  it('should create a new club', async () => {
    const createClubDto = { name: 'Club 3' };
    const newClub = await service.create(createClubDto);
    expect(newClub).toEqual(oneClub);
  });

  it('should update a club', async () => {
    const updateClubDto = { name: 'Updated Club' };
    const updatedClub = await service.update(1, updateClubDto);
    expect(updatedClub).toEqual(oneClub);
  });

  it('should delete a club', async () => {
    const repoSpy = jest.spyOn(repo, 'remove');
    await service.remove(1);
    expect(repoSpy).toBeCalledWith(oneClub);
  });
});
