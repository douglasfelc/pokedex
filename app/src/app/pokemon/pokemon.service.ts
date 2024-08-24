import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class PokemonService {
  private apiUrl = 'http://localhost:3000/api/pokemon';

  constructor(private http: HttpClient) {}

  getPokemonList(limit: number, offset: number): Observable<any> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());

    return this.http.get(`${this.apiUrl}`, { params });
  }

  getPokemonByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${name}`);
  }

  searchPokemon(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search`, {
      params: { name },
    });
  }
}
