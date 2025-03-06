import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonApiResponse {
  results: Pokemon[];
  count: number; // Total de resultados
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemons(page: number, pageSize: number, filter: string = ''): Observable<PokemonApiResponse> {
    const offset = (page - 1) * pageSize;
    let params = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', pageSize.toString());

    if (filter) {
      params = params.set('search', filter);
    }

    return this.http.get<PokemonApiResponse>(this.apiUrl, { params });
  }
}
