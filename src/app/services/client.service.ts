import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client.model';
import { CreateClientDto } from '../models/create-client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getAllClients(search?: string): Observable<Client[]> {
    const params: any = {};
    if (search) {
      params.search = search;
    }

    return this.http.get<Client[]>(
      `${this.apiUrl}/client`,
      { 
        withCredentials: true,
        params
      }
    );
  }

  deleteClient(id: string | number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/client/${id}`,
      { withCredentials: true }
    );
  }

  createClient(clientData: CreateClientDto): Observable<Client> {
    return this.http.post<Client>(
      `${this.apiUrl}/client`,
      clientData,
      { withCredentials: true }
    );
  }

  uploadAvatar(clientId: string, file: File): Observable<Client> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.patch<Client>(
      `${this.apiUrl}/client/${clientId}/avatar`,
      formData,
      { withCredentials: true }
    );
  }
}
