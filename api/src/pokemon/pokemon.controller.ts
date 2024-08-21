import { Controller, Get, Query, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) {}

    @Get()
    async getPokemonList(
      @Query('limit') limit = 20,
      @Query('offset') offset = 0,
    ) {
      return this.pokemonService.getPokemonList(+limit, +offset);
    }
  
    @Get(':name')
    async getPokemonDetails(@Param('name') name: string) {
      return this.pokemonService.getPokemonDetails(name);
    }
}
