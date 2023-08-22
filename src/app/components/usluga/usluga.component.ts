import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { UslugaService } from 'src/app/services/usluga.service';
import { Usluga } from 'src/app/models/usluga';
import { Korisnik_usluge } from 'src/app/models/korisnik-usluge';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UslugaDialogComponent } from '../dialogs/usluga-dialog/usluga-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-usluga',
  templateUrl: './usluga.component.html',
  styleUrls: ['./usluga.component.css']
})
export class UslugaComponent implements OnInit, OnDestroy{
  displayedColumns = ['id', 'naziv', 'opis_Usluge', 'datum_Ugovora', 'provizija', 'filijala', 'korisnikUsluge', 'actions'];
  dataSource!: MatTableDataSource<Usluga>;
  subscription!: Subscription;
  @Input() selektovanKorisnik!: Korisnik_usluge; //Promenljiva u kojoj cuvamo dobavljenog korisnik-a na kog smo kliknuli u front-endu
  //@ViewChild(MatSort, { static: false }) sort!: MatSort;
  //@ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(private uslugaService: UslugaService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(): void {
    if(this.selektovanKorisnik.id) {
       this.loadData();    }  }
       
  loadData() {
    this.subscription = this.uslugaService.getAllUsluge(this.selektovanKorisnik.id)
      .subscribe({
        next: (data) => {
          this.dataSource = data;
          //this.dataSource.sort = this.sort; this.dataSource.paginator = this.paginator;
        },
        error: (error) =>  {this.snackBar.open('Korisnik nema usluga', 'Zatvori', {
          duration: 2500
        }); this.dataSource =  new MatTableDataSource<Usluga>([])},
        complete: () => console.info('complete')
        
    })

  }
  public openDialog(flag: number, usluga?: Usluga) {
    const dialogRef = this.dialog.open(UslugaDialogComponent, { data: (usluga ? usluga : new Korisnik_usluge()) });
    dialogRef.componentInstance.flag = flag;
    if (flag === 1) {
      dialogRef.componentInstance.data.korisnikUsluge = this.selektovanKorisnik;
    }
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result === 1) {
          this.loadData();
        }
      })
  }

  /*applyFilter(filterValue: any) {
    filterValue = filterValue.target.value
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue; //    JaBuKa    --> JaBuKa --> jabuka
  } */
}
