import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss'
})
export class PokemonDetailsComponent {
  pokemon: any;
  loading = true;
  abilities: string = '';
  types: string = '';

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const name = params.get('name');
      if (name) {
        this.pokemonService.getPokemonDetails(name).subscribe({
          next: (data) => {
            this.pokemon = data;
            this.abilities = this.formatAbilities(data.abilities);
            this.types = this.formatTypes(data.types);
            this.loading = false;
          },
          error: (error) => {
            console.error('Error fetching Pokémon details:', error);
            this.loading = false;
          }
        });
      }
    });
  }

  formatAbilities(abilities: any[]): string {
    return abilities.map(ability => ability.ability.name).join(', ');
  }

  formatTypes(types: any[]): string {
    return types.map(type => type.type.name).join(', ');
  }
}
