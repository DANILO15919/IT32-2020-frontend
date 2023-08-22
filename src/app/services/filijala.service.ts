import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FILIJALA_URL } from '../app.constants';
import { Filijala } from '../models/filijala';

@Injectable({
  providedIn: 'root'
})
export class FilijalaService {
  constructor(private httpClient: HttpClient) { }

  public getAllFilijala(): Observable<any>{
    return this.httpClient.get(FILIJALA_URL);
  }

  public addFilijala(filijala: Filijala): Observable<any>{
    return this.httpClient.post(FILIJALA_URL, filijala); //pratiti da posle httpClient
  }

  public updateFilijala(filijala: Filijala): Observable<any>{
    return this.httpClient.put(FILIJALA_URL+"/"+filijala.id, filijala); //mora se poslati ceo objekat
   //iz parametra izvucemo ID 
  }

  public deleteFilijala(idFilijale: number): Observable<any>{ //Prosledjemo tip koji zelimo ovde je to samo ID npr.
    return this.httpClient.delete(FILIJALA_URL+"/"+idFilijale); //mora se poslati ceo objekat
  }
}
