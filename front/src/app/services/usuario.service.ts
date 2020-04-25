import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Usuario } from "../models/usuario.model";


@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  url = "https://ionic-servers.herokuapp.com/api";

  constructor(private http: HttpClient) {}
  registrarUsuario(usuario: Usuario) {
    return this.http.post(`${this.url}/registrar`, usuario).toPromise();
  }
  login(usuario: Usuario) {
    return this.http.post(`${this.url}/login`, usuario).toPromise();

  }
}