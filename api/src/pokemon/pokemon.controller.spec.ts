import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('PokemonController', () => {
  let controller: PokemonController;
  let service: PokemonService;
  let httpService: HttpService;

  beforeEach(async () => {
    httpService = { get: jest.fn() } as unknown as HttpService;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [
        PokemonService,
        {
          provide: HttpService,
          useValue: httpService,
        },
        {
          provide: PokemonService,
          useValue: {
            getPokemonList: jest.fn(),
            getPokemonByName: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
    service = module.get<PokemonService>(PokemonService);
  });

  describe('getPokemonList', () => {
    it('should return an array of pokemons', async () => {
      const result = { results: [{ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon' }] };
      jest.spyOn(service, 'getPokemonList').mockResolvedValue(result);

      expect(await controller.getPokemonList(20, 0)).toBe(result);
    });
  });

  describe('getPokemonByName', () => {
    it('should return a pokemon by name', async () => {
      const result = { name: 'pikachu', id: 1 };
      jest.spyOn(service, 'getPokemonByName').mockResolvedValue(result);

      expect(await controller.getPokemonByName('pikachu')).toBe(result);
    });
  });
});
