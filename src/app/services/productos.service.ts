import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interfaces';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos() {

    return new Promise(( resolve, reject ) => {
      this.http.get('https://angular-html-1a240.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[]) => {
        // console.log(resp);
        this.productos = resp;
        this.cargando = false;
        resolve();
    });

/* setTimeout(() => {
  this.cargando = false;
}, 2000); */

      });
  }

  getProducto(id: string) {
    return this.http.get(`https://angular-html-1a240.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto(termino: string) {

    if (this.productos.length === 0 ) {
      this.cargarProductos().then( () => {
        this.filtrarProductos(termino);
      });
    } else {
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string) {
    console.log('ENTRO AL PRODUCTOFILTRADO: ');
    this.productosFiltrado = this.productos.filter( producto => (
      producto.categoria.indexOf(termino) >= 0 || producto.titulo.toLocaleLowerCase().indexOf(termino.toLocaleLowerCase()) >= 0
    ));
    this.productosFiltrado.forEach(element => {
      console.log(element.titulo);
      
    });
    
  }

}
