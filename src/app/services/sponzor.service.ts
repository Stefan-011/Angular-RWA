import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Sponzor } from '../models/Sponzor';

@Injectable({
  providedIn: 'root'
})
export class SponzorService {

  constructor(private http: HttpClient) { }

  GetAll() // RADI !!
  {
    return this.http.get<Sponzor[]>(environment.api + `/sponzor/GetAll`);
  }

  
  
}


