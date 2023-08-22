import { Component, ViewChild } from '@angular/core';
import { KorisnikUslugeService } from 'src/app/services/korisnik-usluge.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Korisnik_usluge } from 'src/app/models/korisnik-usluge';
import { MatDialog } from '@angular/material/dialog';
import { KorisnikUslugeDialogComponent } from '../dialogs/korisnik-usluge-dialog/korisnik-usluge-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-korisnik-usluge',
  templateUrl: './korisnik-usluge.component.html',
  styleUrls: ['./korisnik-usluge.component.css']
})
export class KorisnikUslugeComponent {
  //Konstruktor za servis
  constructor(private korisnikService: KorisnikUslugeService, private dialog: MatDialog){}; //treba nam i promenljiva za dialog
  //i ne mora se setovati vrednost vec je ovo dependency injection preko konstruktora, pa samo lako pozivamo metodu kasnije.

  subscription!: Subscription;
  displayedColumns = ['id', 'ime', 'prezime', 'maticni_broj', 'actions'];
  dataSource!: MatTableDataSource<Korisnik_usluge>;
  selektovanKorisnik1!: Korisnik_usluge;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  //ngOnInit , metoda koja se poziva prilikom inicijalizacije komponente
  //mi zelimo da kreiramo podatke , tako da je korisniku dovoljno da klikne na Artikl, pa da se automatski inic. sa ngOnInit
  ngOnInit(): void{
    this.loadData();
  };
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  //Dodajemo posto se ne vide odma promene za dialog, refreshuje se samo deo stranice koji je promenenjen
  ngOnChanges(){
    this.loadData();
  }
  
  loadData(): void {
    //Za sada zelimo da u konzoli ispise sve artikle, prvo moramo pozvati servis
    this.subscription = this.korisnikService.getAllKorisniciUsluge().subscribe(
    //ovo ne mozemo poslati u console log, vec moramo obraditi Observable; to radimo preko subscribe
      data => {
        //console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }

  public openDialog(flag: number, korisnik?:Korisnik_usluge): void { //opcioni parametri, prvo idu obavezni parametri pa opcioni.
    //ove nazive metoda mi pozivamo preko event bindinga u nasem .html fajlu za komponent

    //dodajemo ref na dialog
    const dialogRef = this.dialog.open(KorisnikUslugeDialogComponent, {data: (korisnik? korisnik: new Korisnik_usluge())}); //OVDE prosledjujemo iz DIALOG-a podatke
    //const dialogRef = this.dialog.open(BankaDialogComponent); //definisemo okvir "Dialog" i unutar nje prikazujemo komponentu
    //a to je moja banka. 
    dialogRef.componentInstance.flagArtDialog = flag;
    dialogRef.afterClosed().subscribe(res => {if(res == 1) this.loadData()}); //Ponovo ucitati podatke ukoliko je prosledjen 1
    //Potrebno je isto tako definisati html ovog dijaloga..
    

  }

  
  selectRow(row: any) {
    this.selektovanKorisnik1 = row;
  }
  applyFilter(filterValue: any) {
    filterValue = filterValue.target.value
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue; //    JaBuKa    --> JaBuKa --> jabuka
  }

 
}
