import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, NavParams } from '@ionic/angular'
import { NgForm } from '@angular/forms';
import { ProductoService } from '../producto.service'
import { Producto } from '../models/producto.model'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  id: number;
  productos:any;
  PROD: Producto = new Producto();
  constructor(private httpClient: HttpClient, public productoService: ProductoService, 
    public alertController: AlertController) {
    this.productoService.getProducts();
  }

  getProducts() {
    this.productoService.getProducts().then((resp: any) => {
      console.warn(resp);
      this.productos = resp.productos;
    }).catch((err: any) => {
      console.log(err);
    })
  }



guardar(_id, forma: NgForm) {
  this.productoService.editarProducts(_id, this.PROD).then((resp: any) => {
    this.registroExitoso();
  }).catch((err) => {
    console.log(err);
    this.registroFallido();
  });
}

eliminar(_id) {
  this.productoService.deleteProduct(_id).then((resp: any) => {
    this.delExitoso();
  }).catch((err) => {
    console.log(err);
    this.delFallido();
  });
}

  ngOnInit() {
    this.getProducts();
  }

  async registroExitoso() {
    const alert = await this.alertController.create({
      header: 'Exito!',
      message: 'Producto editado',
      buttons: [
        {
          text: '¡Veamos la lista!',
          handler: () => {
            location.href = "tabs/tab1";
          }
        }
      ]
    });
    await alert.present();
  }

  async registroFallido() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Producto no editado :(',
      buttons: ['OK'],

    });
    await alert.present();
  }



  async delExitoso() {
    const alert = await this.alertController.create({
      header: 'Exito!',
      message: 'Producto eliminado',
      buttons: [
        {
          text: '¡Veamos la lista!',
          handler: () => {
            location.href = "tabs/tab1";
          }
        }
      ]
    });
    await alert.present();
  }

  async delFallido() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Producto no eliminado :(',
      buttons: ['OK'],

    });
    await alert.present();
  }

}
