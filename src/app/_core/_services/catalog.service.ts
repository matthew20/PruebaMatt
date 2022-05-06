import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://apitestcotizamatico.azurewebsites.net/api/catalogos';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})

export class CatalogService {

    constructor(private http: HttpClient) { }

    catalog(nombreCatalogo:string,  filtro: string, idAplication: number): Observable<any> {

        return this.http.post(AUTH_API, {
            nombreCatalogo,
            filtro,
            idAplication
          }, httpOptions);
    }
  

}