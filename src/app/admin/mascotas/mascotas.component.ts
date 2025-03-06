import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PokemonService } from 'src/app/services/pokemmon.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.scss']
})
export class MascotasComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'work', 'project', 'priority', 'budget'];
  dataSource = new MatTableDataSource<any>();
  totalPokemons: number = 0;
  pageSize: number = 2;
  pageIndex: number = 0;
  filterValue: string = ''; 
  allPokemons: any[] = []; 

  private subscriptions: Subscription = new Subscription(); 

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private pokemonService: PokemonService) {}
  /**
   * Método de inicialización del componente.
   * Se encarga de cargar la lista inicial de Pokémon.
   */
  ngOnInit(): void {
    this.loadPokemons();

    if (this.paginator) {
      this.subscriptions.add(
        this.paginator.page.subscribe(() => this.onPageChange({ pageIndex: this.paginator!.pageIndex, pageSize: this.pageSize, length: this.totalPokemons }))
      );
    }

    if (this.sort) {
      this.subscriptions.add(
        this.sort.sortChange.subscribe(() => {
          this.dataSource.sort = this.sort!;
        })
      );
    }
  }
   /**
   * Se ejecuta cuando el componente se destruye para evitar memory leaks.
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); 
  }

   /**
   * Carga los Pokémon desde la API.
   * @param page Número de página
   */
  loadPokemons(page: number = 1, filter: string = ''): void {
    const subscription = this.pokemonService.getPokemons(page, this.pageSize).subscribe(response => {
      this.totalPokemons = response.count;
      this.allPokemons = response.results; 
      this.applyClientFilter(); 
    });

    this.subscriptions.add(subscription); 
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.loadPokemons(this.pageIndex + 1, this.filterValue);  
  }

  applyFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.applyClientFilter();
  }

  applyClientFilter(): void {
    const filterValue = this.filterValue.trim().toLowerCase();
    const filteredPokemons = this.allPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(filterValue)
    );

    this.dataSource.data = filteredPokemons;
    if (this.paginator) {
      this.paginator.pageIndex = this.pageIndex; 
    }
  }
}
