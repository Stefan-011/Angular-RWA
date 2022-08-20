import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Sponzor } from '../models/Sponzor';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SponzorService {

  constructor(private http: HttpClient) { }

  GetAll()
  {
    return this.http.get<Sponzor[]>(environment.api + `/sponzor/GetAll`);
  }
}


