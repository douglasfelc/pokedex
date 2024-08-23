import { Component } from '@angular/core';
import { PokemonService } from '../pokemon/pokemon.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];
  loading = false;
  limit = 20;
  offset = 0;
  searchQuery = '';

  constructor(
    private router: Router,
    private pokemonService: PokemonService
  ) {}

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

  goToPokemonDetails(name: string): void {
    this.router.navigate(['/pokemon/', name]);
  }

  getPokemonImageUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  filterPokemons(): void {
    const query = this.searchQuery.toLowerCase();
    const teste = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query)
    );

    console.log('oi', teste);

    this.filteredPokemons = teste;
  }
}
