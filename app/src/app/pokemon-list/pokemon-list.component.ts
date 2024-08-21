import { Component } from '@angular/core';
import { PokemonService } from '../pokemon/pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  pokemons: any[] = [];
  loading = false;
  limit = 20;
  offset = 0;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.loading = true;
    this.pokemonService.getPokemonList(this.limit, this.offset).subscribe({
      next: (data) => {
        this.pokemons = [...this.pokemons, ...data.results];
        this.offset += this.limit;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching Pokémon:', error);
        this.loading = false;
      }
    });
  }

  loadMore(): void {
    if (!this.loading) {
      this.loadPokemons();
    }
  }
}
