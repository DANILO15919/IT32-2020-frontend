import { Component, ViewChild } from '@angular/core';
import { FilijalaService } from 'src/app/services/filijala.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Filijala } from 'src/app/models/filijala';
import { MatDialog } from '@angular/material/dialog';
import { FilijalaDialogComponent } from '../dialogs/filijala-dialog/filijala-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-filijala',
  templateUrl: './filijala.component.html',
  styleUrls: ['./filijala.component.css']
})
export class FilijalaComponent {
  //Konstruktor za servis
  constructor(private filijalaService: FilijalaService, private dialog: MatDialog) { }; //treba nam i promenljiva za dialog
  //i ne mora se setovati vrednost vec je ovo dependency injection preko konstruktora, pa samo lako pozivamo metodu kasnije.

  subscription!: Subscription;
  displayedColumns = ['id', 'adresa', 'broj_pultova', 'poseduje_sef', 'banka', 'actions'];
  dataSource!: MatTableDataSource<Filijala>;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  //ngOnInit , metoda koja se poziva prilikom inicijalizacije komponente
  //mi zelimo da kreiramo podatke , tako da je korisniku dovoljno da klikne na Artikl, pa da se automatski inic. sa ngOnInit
  ngOnInit(): void {
    this.loadData();
  };

  loadData(): void {
    //Za sada zelimo da u konzoli ispise sve artikle, prvo moramo pozvati servis
    this.subscription = this.filijalaService.getAllFilijala().subscribe(
      //ovo ne mozemo poslati u console log, vec moramo obraditi Observable; to radimo preko subscribe
      data => {
        //console.log(data);
        this.dataSource = new MatTableDataSource(data);
        //sortiramo po ugnjezdenom obelezju
        this.dataSource.sortingDataAccessor = (row: Filijala, columnName: string): string => {
 
          console.log(row, columnName);
          if (columnName == "banka") return row.banka.naziv.toLocaleLowerCase();
          var columnValue = row[columnName as keyof Filijala] as unknown as string;
          return columnValue;

        }

        this.dataSource.sort = this.sort;
        //filtriranje po ugnjezdenom obelezju
        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm: any, key: string) => {
            return key === 'banka' ? currentTerm + data.banka.naziv : currentTerm + data[key as keyof Filijala];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };

        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  public openDialog(flag: number, filijala?: Filijala): void { //opcioni parametri, prvo idu obavezni parametri pa opcioni.
    //ove nazive metoda mi pozivamo preko event bindinga u nasem .html fajlu za komponent

    //dodajemo ref na dialog
    const dialogRef = this.dialog.open(FilijalaDialogComponent, { data: (filijala ? filijala : new Filijala()) }); //OVDE prosledjujemo iz DIALOG-a podatke
    //const dialogRef = this.dialog.open(BankaDialogComponent); //definisemo okvir "Dialog" i unutar nje prikazujemo komponentu
    //a to je moja banka. 
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => { if (res == 1) this.loadData() }); //Ponovo ucitati podatke ukoliko je prosledjen 1
    //Potrebno je isto tako definisati html ovog dijloga..


  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  //Dodajemo posto se ne vide odma promene za dialog, refreshuje se samo deo stranice koji je promenenjen
  ngOnChanges() {
    this.loadData();
  }

  applyFilter(filterValue: any) {
    filterValue = filterValue.target.value
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue; //    JaBuKa    --> JaBuKa --> jabuka
  }
}
