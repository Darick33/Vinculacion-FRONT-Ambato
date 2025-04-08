import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PokemonService } from 'src/app/services/pokemmon.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Generos } from 'src/app/interfaces/generos.interface';
import { GenerosService } from 'src/app/services/generos.service';
import { GenerosFormComponent } from './generos-form/generos-form.component';

@Component({
  selector: 'app-generos',
  templateUrl: './generos.component.html',
  styleUrls: ['./generos.component.scss']
})
export class GenerosComponent {

  displayedColumns: string[] = ['nombre', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalGeneros: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  filterValue: string = '';
  generos: Generos[] | undefined;

  private subscriptions: Subscription = new Subscription();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private pokemonService: PokemonService,
    public dialog: MatDialog,
    private GenerosService: GenerosService
  ) { }

  ngOnInit(): void {
    this.loadGeneros();
    if (this.paginator) {
      this.subscriptions.add(
        this.paginator.page.subscribe(() => this.onPageChange({ pageIndex: this.paginator!.pageIndex, pageSize: this.pageSize, length: this.totalGeneros }))
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadGeneros(page: number = 1, filter: string = ''): void {
    const subscription = this.GenerosService.getGeneros(page, this.pageSize).subscribe(response => {
      this.dataSource = new MatTableDataSource(response.items);
this.generos = response.items;
this.totalGeneros = response.totalCount;
// ❌ Esto está mal y pisa la data correcta:
// this.dataSource.data = response.data;
this.dataSource.paginator = this.paginator!;
this.dataSource.sort = this.sort!;

    });
    this.subscriptions.add(subscription);
  }

  ViewWillEnter() {
    this.loadGeneros();
    if (this.paginator) {
      this.subscriptions.add(
        this.paginator.page.subscribe(() => this.onPageChange({ pageIndex: this.paginator!.pageIndex, pageSize: this.pageSize, length: this.totalGeneros }))
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

  resetear() {
    this.pageIndex = 0;
    if (this.paginator) {
      this.paginator.firstPage(); // Reset visualmente el paginador
    }
  }

  applyFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.applyClientFilter();
  }

  applyClientFilter(): void {
    const filterValue = this.filterValue.trim().toLowerCase();
    const filteredPokemons = this.generos
      ? this.generos.filter(pokemon =>
        pokemon.nombre.toLowerCase().includes(filterValue)
      )
      : [];
    this.dataSource.data = filteredPokemons;
    if (this.paginator) {
      this.paginator.pageIndex = this.pageIndex;
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.loadGeneros(this.pageIndex + 1, this.filterValue);
  }

  OpenGeneros() {
    const dialogRef = this.dialog.open(GenerosFormComponent, {
      data: { id: '' } // Pasamos el ID

    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadGeneros();
      this.resetear();
    });
  }

  OpenGenerosEdit(id: number) {
    const dialogRef = this.dialog.open(GenerosFormComponent, {
      data: { id: id } // Pasamos el ID
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadGeneros();
      this.resetear();
    });
  }

  deleteGenero(id: string) {
    this.subscriptions.add(
      this.GenerosService.deleteGenero(id).subscribe({
        next: data => {
          console.log('Datos recibidos:', data);
          this.loadGeneros();
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
