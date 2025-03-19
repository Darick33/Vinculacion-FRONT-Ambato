import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PokemonService } from 'src/app/services/pokemmon.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MascotasFormComponent } from './mascotas-form/mascotas-form.component';
import { MascotasService } from 'src/app/services/mascotas.service';
import { Mascotas } from 'src/app/interfaces/mascotas.interface';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.scss']
})
export class MascotasComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['nombre',  'edad', 'caracter', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalMascotas: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  filterValue: string = ''; 
  mascotas: Mascotas[] | undefined;

  private subscriptions: Subscription = new Subscription(); 
  
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private pokemonService: PokemonService,
  public dialog: MatDialog, private MascotasService: MascotasService,
  

  ) {}
  /**
   * Método de inicialización del componente.
   * Se encarga de cargar la lista inicial de Pokémon.
   */
  
  ngOnInit(): void {
    // this.loadPokemons();
    this.loadMascotas();

    if (this.paginator) {
      this.subscriptions.add(
        this.paginator.page.subscribe(() => this.onPageChange({ pageIndex: this.paginator!.pageIndex, pageSize: this.pageSize, length: this.totalMascotas }))
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
  ViewWillEnter() {
    this.loadMascotas();

    if (this.paginator) {
      this.subscriptions.add(
        this.paginator.page.subscribe(() => this.onPageChange({ pageIndex: this.paginator!.pageIndex, pageSize: this.pageSize, length: this.totalMascotas }))
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
  OpenDenuncias() {
      const dialogRef = this.dialog.open(MascotasFormComponent, {
      });
      const suscription = dialogRef.afterClosed().subscribe(() => {
      });
      this.subscriptions.add(suscription);
    }

   /**
   * Carga los Pokémon desde la API.
   * @param page Número de página
   */
  // loadPokemons(page: number = 1, filter: string = ''): void {
  //   const subscription = this.pokemonService.getPokemons(page, this.pageSize).subscribe(response => {
  //     this.totalMascotas = response.count;
  //     this.allPokemons = response.results; 
  //     this.applyClientFilter(); 
  //   });

  //   this.subscriptions.add(subscription); 
  // }
  loadMascotas(page: number = 1, filter: string = ''): void {
    const subscription = this.MascotasService.getMascotas(page, this.pageSize).subscribe(response => {
      this.totalMascotas = response.totalCount;
      this.mascotas = response.items;
      this.applyClientFilter();
      console.log(this.mascotas)
    });

    this.subscriptions.add(subscription);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.loadMascotas(this.pageIndex + 1, this.filterValue);  
  }

  applyFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.applyClientFilter();
  }

  applyClientFilter(): void {
    const filterValue = this.filterValue.trim().toLowerCase();
    const filteredPokemons = this.mascotas 
      ? this.mascotas.filter(pokemon =>
          pokemon.nombre.toLowerCase().includes(filterValue)
        )
      : [];

    this.dataSource.data = filteredPokemons;
    if (this.paginator) {
      this.paginator.pageIndex = this.pageIndex; 
    }
  }
  OpenAdopciones() {
    const dialogRef = this.dialog.open(MascotasFormComponent, {
      data: { id:'' } // Pasamos el ID

    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadMascotas();
    });
  }
  OpenAdopcionesEdit(id: number) {
    const dialogRef = this.dialog.open(MascotasFormComponent, {
      data: { id: id } // Pasamos el ID
    });
  
    dialogRef.afterClosed().subscribe(() => {
      console.log("Modal cerrado");
      this.loadMascotas();
    });
  }
  delete(id: string){
    this.subscriptions.add(
      this.MascotasService.deleteMascota(id).subscribe({
        next: data => {
          console.log('Datos recibidos:', data);
          this.loadMascotas();
        },
        error: error => {
          console.log('Error en la peticion', 'error');
        },
        complete: () => {
        }
      })
    )
  }
  
}
