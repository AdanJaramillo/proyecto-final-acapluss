import { Component, OnInit } from '@angular/core';
import { UsuarioService } from "../services/usuario.service";
import { Usuario } from "../models/usuario.model";
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [UsuarioService]
})
export class LoginPage implements OnInit {
  usuario: Usuario = new Usuario();
  constructor(public alertController: AlertController, private service: UsuarioService) { }


  async error() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Usuario o contraseña incorrectos.',
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
  }

  login(form: NgForm) {
    this.service.login(this.usuario).then((usuario: any) => {
      form.reset();
      localStorage.setItem('token', usuario.token);
      location.pathname = "tabs/tab1"
    }).catch((err: any) => {
      console.log(err);
      this.error();
      form.resetForm();
    });
  }

  registrar() {
    location.href = "/registro";
  }



}

