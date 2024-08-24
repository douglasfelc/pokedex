import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
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
    private router: Router,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const name = params.get('name');
      if (name) {
        this.pokemonService.getPokemonByName(name).subscribe({
          next: (data) => {
            this.pokemon = data;
            this.abilities = this.formatAbilities(data.abilities);
            this.types = this.formatTypes(data.types);
          },
          error: (error) => {
            console.error('Error fetching Pokémon details:', error);
          }
        }).add(() => this.loading = false)
      }
    });
  }

  formatAbilities(abilities: any[]): string {
    return abilities.map(ability => ability.ability.name).join(', ');
  }

  formatTypes(types: any[]): string {
    return types.map(type => type.type.name).join(', ');
  }

  goToList(): void {
    this.router.navigate(['/']);
  }
}
