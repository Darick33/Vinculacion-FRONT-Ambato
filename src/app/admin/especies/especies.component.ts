import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PokemonService } from 'src/app/services/pokemmon.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Especies } from 'src/app/interfaces/especies.interface';
import { EspeciesService } from 'src/app/services/especies.service';
import { EspeciesFormComponent } from './especies-form/especies-form.component';

@Component({
  selector: 'app-especies',
  templateUrl: './especies.component.html',
  styleUrls: ['./especies.component.scss']
})
export class EspeciesComponent {

  displayedColumns: string[] = ['nombre',  'actions'];
  dataSource = new MatTableDataSource<any>();
  totalEspecies: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  filterValue: string = '';
  especies: Especies[] | undefined;

  private subscriptions: Subscription = new Subscription();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private pokemonService: PokemonService,
    public dialog: MatDialog,
    private EspecieService: EspeciesService
  ) { }

  ngOnInit(): void {
    this.loadEspecies();
    if (this.paginator) {
      this.subscriptions.add(
        this.paginator.page.subscribe(() => this.onPageChange({ pageIndex: this.paginator!.pageIndex, pageSize: this.pageSize, length: this.totalEspecies }))
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

  loadEspecies(page: number = 1, filter: string = ''): void {
    const subscription = this.EspecieService.getEspecies(page, this.pageSize).subscribe(response => {
      this.totalEspecies = response.totalCount;
      this.especies = response.items;
      this.applyClientFilter();
      console.log(this.especies)
    });

    this.subscriptions.add(subscription);
  }
  ViewWillEnter() {
    this.loadEspecies();
    if (this.paginator) {
      this.subscriptions.add(
        this.paginator.page.subscribe(() => this.onPageChange({ pageIndex: this.paginator!.pageIndex, pageSize: this.pageSize, length: this.totalEspecies }))
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
  resetear(){
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
    const filteredPokemons = this.especies
      ? this.especies.filter(pokemon =>
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
    this.loadEspecies(this.pageIndex + 1, this.filterValue);
  }
  OpenEspecies() {
    const dialogRef = this.dialog.open(EspeciesFormComponent, {
      data: { id: '' } // Pasamos el ID

    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadEspecies();
      this.resetear();
    });
  }

  OpenEspeciesEdit(id: number) {
    const dialogRef = this.dialog.open(EspeciesFormComponent, {
      data: { id: id } // Pasamos el ID
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadEspecies();
      this.resetear();

    });
  }

  deleteEspecie(id: string) {
    this.subscriptions.add(
      this.EspecieService.deleteEspecie(id).subscribe({
        next: data => {
          console.log('Datos recibidos:', data);
          this.loadEspecies();
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
