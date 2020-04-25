import { Component } from '@angular/core';
import { BarcodeScannerOptions, BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { ProductoService } from '../producto.service'
import { Producto } from '../models/producto.model'
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  datocodificado: any;
  datoscaneado: {};
  producto: Producto = new Producto();
  constructor(private barcodeScanner: BarcodeScanner, public alertController: AlertController,
    private productoService : ProductoService) {

  }
  LeerCode() {
    this.barcodeScanner.scan().then(barcodeData => {
        this.datoscaneado = barcodeData;
      })
      .catch(err => {
        console.log("Error", err);
      });
  }
   
  CodificarTexto() {
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.datocodificado).then(
        encodedData => {
          this.datocodificado = encodedData;
        },
        err => {
          console.log("Un error ha ocurrido: " + err);
        }
      );
  }
  
  async registroExitoso() {
    const alert = await this.alertController.create({
      header: 'Exito!',
      message: 'Producto agregado',
      buttons: [
        {
          text: '¡Veamos la lista!',
          handler: () => {
            location.href = "/tabs/tab1";
          }
        }
      ]
    });
    await alert.present();
  }

  async registroFallido() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Producto no agregado :(',
      buttons: ['OK'],

    });
    await alert.present();
  }

  return() {
    location.href = "/tabs/tab2";
  }

  registrarProducto(forma: NgForm) {
    this.productoService.registrarProducto(this.producto).then((resp: any) => {
      this.registroExitoso();
    }).catch((err) => {
      console.log(err);
      this.registroFallido();
    });

  }

}
