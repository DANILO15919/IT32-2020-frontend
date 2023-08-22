import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BankaComponent } from './components/banka/banka.component';
import { FilijalaComponent } from './components/filijala/filijala.component';
import { KorisnikUslugeComponent } from './components/korisnik-usluge/korisnik-usluge.component';
import { UslugaComponent } from './components/usluga/usluga.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { AppRoutingModule } from './app-routing-module';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog'; //V8 dialozi
import { MatSnackBarModule } from '@angular/material/snack-bar'; //Salje korisniku kratke poruke za potvrde izmena
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BankaDialogComponent } from './components/dialogs/banka-dialog/banka-dialog.component';
import { KorisnikUslugeDialogComponent } from './components/dialogs/korisnik-usluge-dialog/korisnik-usluge-dialog.component';
import { FilijalaDialogComponent } from './components/dialogs/filijala-dialog/filijala-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UslugaDialogComponent } from './components/dialogs/usluga-dialog/usluga-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    BankaComponent,
    FilijalaComponent,
    KorisnikUslugeComponent,
    UslugaComponent,
    BankaDialogComponent,
    KorisnikUslugeDialogComponent,
    FilijalaDialogComponent,
    UslugaDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule, 
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatToolbarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSelectModule,
    MatNativeDateModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
