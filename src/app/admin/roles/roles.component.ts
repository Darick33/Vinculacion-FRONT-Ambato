import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Rol } from 'src/app/interfaces/roles.interface';
import { RolesService } from 'src/app/services/roles.service';
import { RolesFormComponent } from './roles-form/roles-form.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent {
  displayedColumns: string[] = ['nombre',  'descripcion',  'actions'];
  dataSource = new MatTableDataSource<any>();
  totalRoles: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  filterValue: string = ''; 
  roles: Rol[] | undefined;

  private subscriptions: Subscription = new Subscription(); 
  
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private rolesService: RolesService,
  public dialog: MatDialog, 
  

  ) {}
  /**
   * Método de inicialización del componente.
   * Se encarga de cargar la lista inicial de Pokémon.
   */
  
  ngOnInit(): void {
    // this.loadPokemons();
    this.loadRoles();

    if (this.paginator) {
      this.subscriptions.add(
        this.paginator.page.subscribe(() => this.onPageChange({ pageIndex: this.paginator!.pageIndex, pageSize: this.pageSize, length: this.totalRoles }))
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
    this.loadRoles();

    if (this.paginator) {
      this.subscriptions.add(
        this.paginator.page.subscribe(() => this.onPageChange({ pageIndex: this.paginator!.pageIndex, pageSize: this.pageSize, length: this.totalRoles }))
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
      const dialogRef = this.dialog.open(RolesFormComponent, {
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
  //     this.totalRoles = response.count;
  //     this.allPokemons = response.results; 
  //     this.applyClientFilter(); 
  //   });

  //   this.subscriptions.add(subscription); 
  // }
  resetear(){
      this.pageIndex = 0;
      if (this.paginator) {
        this.paginator.firstPage(); // Reset visualmente el paginador
      }
  }
  loadRoles(page: number = 1, filter: string = ''): void {
    const subscription = this.rolesService.getRoles(page, this.pageSize, filter)
      .subscribe(response => {
        this.totalRoles = response.totalCount; // Asigna el total correcto
        this.pageSize = response.pageSize; // Asegúrate de usar el tamaño de página del backend
        this.roles = response.items; // Lista de mascotas
        this.applyClientFilter();

      });
  
    this.subscriptions.add(subscription);
  }
  

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.loadRoles(this.pageIndex + 1, this.filterValue);  
  }

  applyFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.applyClientFilter();
  }

  applyClientFilter(): void {
    const filterValue = this.filterValue.trim().toLowerCase();
    const filteredPokemons = this.roles 
      ? this.roles.filter(pokemon =>
          pokemon.nombre.toLowerCase().includes(filterValue)
        )
      : [];

    this.dataSource.data = filteredPokemons;
    if (this.paginator) {
      this.paginator.pageIndex = this.pageIndex; 
    }
  }
  OpenAdopciones() {
    const dialogRef = this.dialog.open(RolesFormComponent, {
      data: { id:'' } // Pasamos el ID

    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadRoles();
      this.resetear();

    });
  }
  OpenAdopcionesEdit(id: number) {
    const dialogRef = this.dialog.open(RolesFormComponent, {
      data: { id: id } // Pasamos el ID
    });
  
    dialogRef.afterClosed().subscribe(() => {
      console.log("Modal cerrado");
      this.loadRoles();
      this.resetear();
    });
  }
  delete(id: string){
    this.subscriptions.add(
      this.rolesService.deleteRol(id).subscribe({
        next: data => {
          console.log('Datos recibidos:', data);
          this.loadRoles();
      this.resetear();

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
