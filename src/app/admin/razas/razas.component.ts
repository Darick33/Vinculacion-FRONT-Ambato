import { raza } from './../../interfaces/mascotas.interface';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PokemonService } from 'src/app/services/pokemmon.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Razas } from 'src/app/interfaces/razas.interface';
import { RazasService } from 'src/app/services/razas.service';
import { RazasFormComponent } from './razas-form/razas-form.component';

@Component({
  selector: 'app-razas',
  templateUrl: './razas.component.html',
  styleUrls: ['./razas.component.scss']
})
export class RazasComponent {
  displayedColumns: string[] = ['nombre', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalRazas: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;
  filterValue: string = '';
  razas: Razas[] | undefined;

  private subscriptions: Subscription = new Subscription();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(
    private razasService: RazasService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadRazas();
    if (this.paginator) {
      this.subscriptions.add(
        this.paginator.page.subscribe(() => this.onPageChange({ pageIndex: this.paginator!.pageIndex, pageSize: this.pageSize, length: this.totalRazas }))
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

  loadRazas(page: number = 1, filter: string = ''): void {
    const subscription = this.razasService.getRazas(page, this.pageSize).subscribe(response => {
      this.totalRazas = response.totalCount;
      this.razas = response.items;
      this.applyClientFilter();
      console.log(this.razas)
    });

    this.subscriptions.add(subscription);
  }

  ViewWillEnter() {
    this.loadRazas();
    if (this.paginator) {
      this.subscriptions.add(
        this.paginator.page.subscribe(() => this.onPageChange({ pageIndex: this.paginator!.pageIndex, pageSize: this.pageSize, length: this.totalRazas }))
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
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
    this.dataSource.paginator = this.paginator!;
  }
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadRazas(this.pageIndex + 1, this.filterValue);
  }
  OpenRazas() {
    const dialogRef = this.dialog.open(RazasFormComponent, {
      data: { id: '' } // Pasamos el ID

    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadRazas();
      this.resetear();
    });
  }
  OpenRazasEdit(id: number) {
    const dialogRef = this.dialog.open(RazasFormComponent, {
      data: { id: id } // Pasamos el ID
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadRazas();
      this.resetear();
    });
  }
  deleteRaza(id: string) {
    this.subscriptions.add(
      this.razasService.deleteRaza(id).subscribe({
        next: data => {
          console.log('Datos recibidos:', data);
          this.loadRazas();
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
