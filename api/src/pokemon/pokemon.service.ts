import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PokemonService {
    private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';

    constructor(private readonly httpService: HttpService) {}
  
    async getPokemonList(limit: number, offset: number): Promise<any> {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}?limit=${limit}&offset=${offset}`),
      );
      return response.data;
    }
  
    async getPokemonDetails(name: string): Promise<any> {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/${name}`),
      );
      return response.data;
    }
}
