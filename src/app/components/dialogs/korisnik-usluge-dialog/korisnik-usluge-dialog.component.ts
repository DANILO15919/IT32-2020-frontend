import { MatSnackBar } from '@angular/material/snack-bar';
import { Korisnik_usluge } from 'src/app/models/korisnik-usluge';
import { KorisnikUslugeService } from 'src/app/services/korisnik-usluge.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-korisnik-usluge-dialog',
  templateUrl: './korisnik-usluge-dialog.component.html',
  styleUrls: ['./korisnik-usluge-dialog.component.css']
})
export class KorisnikUslugeDialogComponent {
  public flagArtDialog!: number; //Ovo mora biti isto kao i u Korisnik.component.ts, referenca na flag koju koristimo za dialog

  constructor(public snackBar: MatSnackBar, //Definisanje poruke korisniku za obavestenja posle akcija
    public korisnikService: KorisnikUslugeService, //Pozivanje metoda servisa
    @Inject(MAT_DIALOG_DATA) public dataKorisnik: Korisnik_usluge, //dataKorisnik ocekuje injekciju podataka iz tipa KORISNIK_usluge -> openDialog funkc. u korisnik-usluge.comp.ts
    public dialogRef: MatDialogRef<KorisnikUslugeDialogComponent>) { } //Referenca na nas dialog koji kreiramo, dialog ref. unutar dialoga.

    //Dalje idu pozivi servisa, i subscribe-emo se na sve da bi sacekali backend da vrati podatke i da prikazemo azurne podatke.
    //Ukoliko ne cekamo onda nemamo predvidivo desavanje aplikacije zato sto je moguce da ce se nesto izvrsiti kasnije
    //dakle cekamo odgovor backend-a
  public add(): void {
    console.log("ID je " + this.dataKorisnik.id + " " + this.dataKorisnik.ime + " " + this.dataKorisnik.prezime);
    this.korisnikService.addKorisnikUsluge(this.dataKorisnik).subscribe(() => {
      this.snackBar.open('Uspesno dodat korisnik: ' + this.dataKorisnik.ime + this.dataKorisnik.prezime, 'OK', {
        duration: 2500
      })
    }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message)
        this.snackBar.open('Doslo je do greske prilikom dodavanja novog korisnika. ', 'Zatvori', {
          duration: 2500
        })
      };
  }
  public update(): void {
    this.korisnikService.updateKorisnikUsluge(this.dataKorisnik).subscribe(() => {
      this.snackBar.open('Uspesno izmenjen korisnik sa imenom: ' + this.dataKorisnik.ime + this.dataKorisnik.prezime, 'OK', {
        duration: 2500
      })
    }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message)
        this.snackBar.open('Doslo je do greske prilikom izmene korisnika. ', 'Zatvori', {
          duration: 2500
        })
      };

  }

  public delete(): void {
    this.korisnikService.deleteKorisnikUsluge(this.dataKorisnik.id).subscribe(() => {
      this.snackBar.open('Uspesno obrisan korisnik: ' + this.dataKorisnik.ime + this.dataKorisnik.prezime, 'OK', {
        duration: 2500
      })
    }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message)
        this.snackBar.open('Doslo je do greske prilikom brisanja korisnika. ', 'Zatvori', {
          duration: 2500
        })
      };
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmene. ', 'Zatvori', {
      duration: 1000
    })
  }
}
