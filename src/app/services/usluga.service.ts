import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { USLUGA_URL, USLUGE_ZA_KORISNIKA_URL } from '../app.constants';
import { Usluga } from '../models/usluga';
@Injectable({
  providedIn: 'root'
})
export class UslugaService {

  constructor(private httpClient: HttpClient) { }

  public getAllUsluge(korisnikId: number): Observable<any> {
    return this.httpClient.get(USLUGE_ZA_KORISNIKA_URL+'/'+korisnikId);
  }

  public addUsluga(usluga: Usluga): Observable<any> {
    return this.httpClient.post(USLUGA_URL, usluga);
  }

  public deleteUsluga(id: number): Observable<any> {
    return this.httpClient.delete(USLUGA_URL  + "/" + id);
  }

  public updateUsluga(usluga: Usluga) : Observable<any>{
    return this.httpClient.put(USLUGA_URL + "/" + usluga.id, usluga);  }
}
