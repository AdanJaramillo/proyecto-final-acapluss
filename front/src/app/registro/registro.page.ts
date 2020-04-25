import { Component, OnInit } from '@angular/core';
import { UsuarioService } from "../services/usuario.service";
import { Usuario } from "../models/usuario.model";
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  usuario: Usuario = new Usuario();
  constructor(public alertController: AlertController, private usuarioService: UsuarioService) { }

  async registroExitoso() {
    const alert = await this.alertController.create({
      header: 'Exito!',
      message: 'El usuario se ha creado',
      buttons: [
        {
          text: '¡Iniciar sesión!',
          handler: () => {
            location.href = "/";
          }
        }
      ]
    });
    await alert.present();
  }

  async registroFallido() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Usuario no registrado',
      buttons: ['OK'],

    });
    await alert.present();
  }

  ngOnInit() {

  }

  return() {
    location.href = "/";
  }

  registrarUsuario(forma: NgForm) {
    this.usuarioService.registrarUsuario(this.usuario).then((resp: any) => {
      this.registroExitoso();
    }).catch((err) => {
      console.log(err);
      this.registroFallido();
    });

  }

}