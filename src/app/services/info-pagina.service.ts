import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina-interfaces';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  equipo: any [] = [];

  constructor( private http: HttpClient) {

    this.cargarInfo();
    this.cargarEquipo();
   }

  private cargarInfo() {
    console.log('Servicio info pagina LISTO');

    // Leer el archivo JSON
    this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp: InfoPagina) => {
        this.cargada = true;
        this.info = resp;
        // console.log(resp);
        // console.log(resp['email']);
      });

  }

  private cargarEquipo() {
    this.http.get('https://angular-html-1a240.firebaseio.com/equipo.json')
      .subscribe( (resp: any[] ) => {
        this.equipo = resp;
        console.log(resp);
        // console.log(resp['email']);
      });
  }
}

