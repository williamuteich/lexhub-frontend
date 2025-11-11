import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProcessoResponse } from '../models/processo.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {
  private http = inject(HttpClient)
  private apiUrl = environment.apiUrl

  getAllProcessos(): Observable<ProcessoResponse>{
    return this.http.get<ProcessoResponse>(
      `${this.apiUrl}/processo`,
      {withCredentials: true}
    )
  }
}
