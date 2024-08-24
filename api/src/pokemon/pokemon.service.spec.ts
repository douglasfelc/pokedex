import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('getPokemonList', () => {
    it('should return a list of pokemons with ids', async () => {
      const response: AxiosResponse = { 
        data: { results: [{ name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/1/' }] },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
            headers: {
                'Content-Type': 'application/json'
            } as any
        }
      };
      jest.spyOn(httpService, 'get').mockReturnValue(of(response));

      const result = await service.getPokemonList(20, 0);
      expect(result.results[0].id).toBe(1);
    });
  });

  describe('getPokemonByName', () => {
    it('should return a pokemon by name', async () => {
      const response: AxiosResponse = { 
        data: { name: 'pikachu', id: 1 },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
            headers: {
                'Content-Type': 'application/json'
            } as any
        }
      };
      jest.spyOn(httpService, 'get').mockReturnValue(of(response));

      const result = await service.getPokemonByName('pikachu');
      expect(result.name).toBe('pikachu');
    });
  });
});
