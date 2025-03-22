import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PokemonService } from 'src/app/services/pokemmon.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MascotasService } from 'src/app/services/mascotas.service';
import { Mascotas } from 'src/app/interfaces/mascotas.interface';
import { AdopcionesFormComponent } from 'src/app/public/adopciones/adopciones.component';
import { TramitesService } from 'src/app/services/tramites.service';
import { Tramite } from 'src/app/interfaces/tramites.interface';
import { DenunciasFormComponent } from 'src/app/public/denuncias/denuncias.component';

@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.component.html',
  styleUrl: './denuncias.component.scss'
})
export class DenunciasComponent {
 displayedColumns: string[] = ['datos',  'fecha', 'direccion', 'denunciante', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalDenuncias: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  filterValue: string = ''; 
  tramites: Tramite[] | undefined; 

  private subscriptions: Subscription = new Subscription(); 
  
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private pokemonService: PokemonService, private tramitesService: TramitesService,
  public dialog: MatDialog, 
  

  ) {}
  /**
   * Método de inicialización del componente.
   * Se encarga de cargar la lista inicial de Pokémon.
   */
  
  ngOnInit(): void {
    // this.loadPokemons();
    this.loadDenuncias();

    if (this.paginator) {
      this.subscriptions.add(
        this.paginator.page.subscribe(() => this.onPageChange({ pageIndex: this.paginator!.pageIndex, pageSize: this.pageSize, length: this.totalDenuncias }))
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
    this.loadDenuncias();

    if (this.paginator) {
      this.subscriptions.add(
        this.paginator.page.subscribe(() => this.onPageChange({ pageIndex: this.paginator!.pageIndex, pageSize: this.pageSize, length: this.totalDenuncias }))
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
   * Carga los Pokémon desde la API.
   * @param page Número de página
   */
  // loadPokemons(page: number = 1, filter: string = ''): void {
  //   const subscription = this.pokemonService.getPokemons(page, this.pageSize).subscribe(response => {
  //     this.totalDenuncias = response.count;
  //     this.allPokemons = response.results; 
  //     this.applyClientFilter(); 
  //   });

  //   this.subscriptions.add(subscription); 
  // }
  loadDenuncias(page: number = 1, filter: string = ''): void {
    const subscription = this.tramitesService.getTramites(page, this.pageSize).subscribe(response => {
      this.totalDenuncias = response.totalCount;
      this.tramites = response.items;
      this.applyClientFilter();
      console.log(this.tramites)
    });

    this.subscriptions.add(subscription);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.loadDenuncias(this.pageIndex + 1, this.filterValue);  
  }

  applyFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.applyClientFilter();
  }

  applyClientFilter(): void {
    const filterValue = this.filterValue.trim().toLowerCase();
    const filteredTramite = this.tramites
      ? this.tramites.filter(tramite =>
          tramite.nombre.toLowerCase().includes(filterValue)
        )
      : [];

    this.dataSource.data = filteredTramite;
    if (this.paginator) {
      this.paginator.pageIndex = this.pageIndex; 
    }
  }
  OpenAdopciones() {
    const dialogRef = this.dialog.open(DenunciasFormComponent, {
      data: { id:'' } // Pasamos el ID

    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadDenuncias();
    });
  }
  OpenAdopcionesEdit(id: number) {
    const dialogRef = this.dialog.open(DenunciasFormComponent, {
      data: { id: id } // Pasamos el ID
    });
  
    dialogRef.afterClosed().subscribe(() => {
      console.log("Modal cerrado");
      this.loadDenuncias();
    });
  }
  delete(id: string){
    this.subscriptions.add(
      this.tramitesService.deleteTramite(id).subscribe({
        next: data => {
          console.log('Datos recibidos:', data);
          this.loadDenuncias();
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
