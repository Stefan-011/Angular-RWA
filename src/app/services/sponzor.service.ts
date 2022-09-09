import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Sponzor } from '../models/Sponzor';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SponzorService {
  constructor(private http: HttpClient) {}

  GetAll() {
    return this.http.get<Sponzor[]>(environment.api + `/sponzor/GetAll`);
  }

  CreateSponzor(Sponzor: Sponzor) {
    return this.http.post<Sponzor>(
      environment.api + `/sponzor/CreateSponzor`,
      Sponzor
    );
  }

  EditSponzor() {
    //  return this.http.pust<Sponzor>(environment.api )
  }

  DeleteSponzor() {
    //  return this.http.delete<Sponzor>(environment.api )
  }
}
