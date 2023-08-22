import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BANKA_URL } from '../app.constants';
import { Banka } from '../models/banka';

@Injectable({
  providedIn: 'root'
})
export class BankaService {

  constructor(private httpClient: HttpClient) { }

  public getAllBankas(): Observable<any>{
    return this.httpClient.get(BANKA_URL);
  }

  public addBanka(banka: Banka): Observable<any>{
    return this.httpClient.post(BANKA_URL, banka); //pratiti da posle httpClient
  }

  public updateBanka(banka: Banka): Observable<any>{
    return this.httpClient.put(BANKA_URL+"/"+banka.id, banka); //mora se poslati ceo objekat
   //iz parametra izvucemo ID 
  }

  public deleteBanka(idBanke: number): Observable<any>{ //Prosledjemo tip koji zelimo ovde je to samo ID npr.
    return this.httpClient.delete(BANKA_URL+"/"+idBanke); //mora se poslati ceo objekat
  }
}
