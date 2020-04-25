import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Producto } from './models/producto.model'


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = "https://ionic-servers.herokuapp.com/api";
  PROD: Producto = new Producto();
  constructor(private http: HttpClient) {
   }

  registrarProducto(producto: Producto) {
    return this.http.post(`${this.url}/producto`, producto).toPromise();
  }
  getProducts(): Promise<any> {
    return this.http.get(`${this.url}/producto`).toPromise();
  }
  deleteProduct(_id: string): Promise<any> {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.url}/producto/${_id}`).subscribe(res => {
        console.log('respuesta', res);
        resolve();
      }, err => {
        console.log('error', err);
        reject();
      })
    })
    return;
  }

  editarProducts(_id: string, producto: Producto): Promise<any> {
    return this.http.put(`${this.url}/producto/${_id}`, producto).toPromise();
  }

}
