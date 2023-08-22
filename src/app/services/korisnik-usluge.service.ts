import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KORISNIK_USLUGE_URL } from '../app.constants';
import { Korisnik_usluge } from '../models/korisnik-usluge';

@Injectable({
  providedIn: 'root'
})
export class KorisnikUslugeService {

  constructor(private httpClient: HttpClient) { }

  public getAllKorisniciUsluge(): Observable<any>{
    return this.httpClient.get(KORISNIK_USLUGE_URL);
  }

  public addKorisnikUsluge(korisnik: Korisnik_usluge): Observable<any>{
    return this.httpClient.post(KORISNIK_USLUGE_URL, korisnik); //pratiti da posle httpClient
  }

  public updateKorisnikUsluge(korisnik: Korisnik_usluge): Observable<any>{
    return this.httpClient.put(KORISNIK_USLUGE_URL+"/"+korisnik.id, korisnik); //mora se poslati ceo objekat
   //iz parametra izvucemo ID 
  }

  public deleteKorisnikUsluge(idKorisnika: number): Observable<any>{ //Prosledjemo tip koji zelimo ovde je to samo ID npr.
    return this.httpClient.delete(KORISNIK_USLUGE_URL+"/"+idKorisnika); //mora se poslati ceo objekat
  }
}
