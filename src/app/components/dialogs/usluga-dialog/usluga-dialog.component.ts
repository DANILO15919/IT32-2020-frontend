import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Filijala } from 'src/app/models/filijala';
import { Korisnik_usluge } from 'src/app/models/korisnik-usluge';
import { Usluga } from 'src/app/models/usluga';
import { FilijalaService } from 'src/app/services/filijala.service';
import { KorisnikUslugeService } from 'src/app/services/korisnik-usluge.service';
import { UslugaService } from 'src/app/services/usluga.service';

@Component({
  selector: 'app-usluga-dialog',
  templateUrl: './usluga-dialog.component.html',
  styleUrls: ['./usluga-dialog.component.css']
})
export class UslugaDialogComponent {
  filijale!: Filijala[];
  korisnici!: Korisnik_usluge[];
  public flag!: number;
  korisnikSubscription!: Subscription;
  filijalaSubscription!: Subscription;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UslugaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usluga,
    public uslugaService: UslugaService,
    public korisnikUslugeService: KorisnikUslugeService,
    public filijalaService: FilijalaService) { }

  ngOnDestroy(): void {
    this.korisnikSubscription.unsubscribe();
    this.filijalaSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.korisnikSubscription = this.korisnikUslugeService.getAllKorisniciUsluge()
      .subscribe(korisnici => {
        this.korisnici = korisnici;
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
      this.filijalaSubscription = this.filijalaService.getAllFilijala()
      .subscribe(filijale => {
        this.filijale = filijale;
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
  }

  compareTo(a: any, b: any) {
    return a.id === b.id;
  }

  public add(): void {
    this.uslugaService.addUsluga(this.data)
      .subscribe(() => {
        this.snackBar.open('Uspešno dodata usluga korisniku!', 'U redu', {
          duration: 2500
        })
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Dogodila se greška!', 'Zatvori', {
          duration: 1500
        })
      };
  }

  public update(): void {
    this.uslugaService.updateUsluga(this.data)
      .subscribe(() => {
        this.snackBar.open('Uspešno modifikovana usluga!', 'U redu', {
          duration: 2500
        })
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Dogodila se greška!', 'Zatvori', {
          duration: 1500
        })
      };
  }

  public delete(): void {
    this.uslugaService.deleteUsluga(this.data.id)
      .subscribe(() => {
        this.snackBar.open('Uspešno obrisana usluga!', 'U redu', {
          duration: 2500
        })
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Dogodila se greška!', 'Zatvori', {
          duration: 1500
        })
      };
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste!', 'Zatvori', {
      duration: 1500
    })
  }
}
