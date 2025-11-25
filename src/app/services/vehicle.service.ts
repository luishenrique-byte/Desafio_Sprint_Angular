import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';
import { HttpClient } from '@angular/common/http';

interface ApiResponse {
  length: number;
  vehicles: Vehicle[];
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  
  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  // Busca a lista de todos os carros
  getVehicles(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/vehicles`);
  }

  // Busca um carro específico pelo código VIN
  getVehicleByVin(vin: string): Observable<Vehicle> {
    const body = { vin: vin };
    return this.http.post<Vehicle>(`${this.baseUrl}/vehicleData`, body);
  }
}
