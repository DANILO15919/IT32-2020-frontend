import { MatSnackBar } from '@angular/material/snack-bar';
import { Banka } from 'src/app/models/banka';
import { BankaService } from 'src/app/services/banka.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-banka-dialog',
  templateUrl: './banka-dialog.component.html',
  styleUrls: ['./banka-dialog.component.css']
})
export class BankaDialogComponent {
  public flagArtDialog!: number; //Ovo mora biti isto kao i u banka.component.ts, referenca na flag koju koristimo za dialog

  constructor(public snackBar: MatSnackBar, //Definisanje poruke korisniku za obavestenja posle akcija
    public bankaService: BankaService, //Pozivanje metoda servisa
    @Inject(MAT_DIALOG_DATA) public dataBanka: Banka, //dataBanka ocekuje injekciju podataka iz tipa BANKA -> openDialog funkc. u banka.comp.ts
    public dialogRef: MatDialogRef<BankaDialogComponent>) { } //Referenca na nas dialog koji kreiramo, dialog ref. unutar dialoga.

    //Dalje idu pozivi servisa, i subscribe-emo se na sve da bi sacekali backend da vrati podatke i da prikazemo azurne podatke.
    //Ukoliko ne cekamo onda nemamo predvidivo desavanje aplikacije zato sto je moguce da ce se nesto izvrsiti kasnije
    //dakle cekamo odgovor backend-a
  public add(): void {
    console.log("ID je " + this.dataBanka.id + " " + this.dataBanka.naziv);
    this.bankaService.addBanka(this.dataBanka).subscribe(() => {
      this.snackBar.open('Uspesno dodata banka: ' + this.dataBanka.naziv, 'OK', {
        duration: 2500
      })
    }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message)
        this.snackBar.open('Doslo je do greske prilikom dodavanja nove banke. ', 'Zatvori', {
          duration: 2500
        })
      };
  }
  public update(): void {
    this.bankaService.updateBanka(this.dataBanka).subscribe(() => {
      this.snackBar.open('Uspesno izmenjena banka: ' + this.dataBanka.naziv, 'OK', {
        duration: 2500
      })
    }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message)
        this.snackBar.open('Doslo je do greske prilikom izmene banke. ', 'Zatvori', {
          duration: 2500
        })
      };

  }

  public delete(): void {
    this.bankaService.deleteBanka(this.dataBanka.id).subscribe(() => {
      this.snackBar.open('Uspesno obrisana banka: ' + this.dataBanka.naziv, 'OK', {
        duration: 2500
      })
    }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message)
        this.snackBar.open('Doslo je do greske prilikom brisanja banke. ', 'Zatvori', {
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
