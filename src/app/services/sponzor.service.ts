import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Sponzor } from '../models/Sponzor';
import { Injectable } from '@angular/core';
import { RequestResponse } from '../models/RequestResponse';
import { PanelErrorMessage } from '../Enums/PanelErrorMessage';

@Injectable({
  providedIn: 'root',
})
export class SponzorService {
  constructor(private http: HttpClient) {}

  GetAll() {
    return this.http.get<Sponzor[]>(environment.api + `/sponzor/GetAll`);
  }

  CreateSponzor(Sponzor: Sponzor) {
    return this.http.post<RequestResponse<any, PanelErrorMessage>>(
      environment.api + `/sponzor/CreateSponzor`,
      Sponzor
    );
  }

  EditSponzor(Sponzor: Sponzor) {
    return this.http.put<RequestResponse<any, PanelErrorMessage>>(
      environment.api + `/sponzor/EditSponzor`,
      Sponzor
    );
  }

  DeleteSponzor(SponzorID: number) {
    return this.http.delete<RequestResponse<any, PanelErrorMessage>>(
      environment.api + `/sponzor/DeleteSponzor/:${SponzorID}`
    );
  }
}
