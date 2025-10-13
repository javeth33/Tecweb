import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorsService } from './tools/errors.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    public validatorService: ValidatorService,
    public errorService: ErrorsService,
    private http: HttpClient
  ) { }


   public esquemaUser(){
    return {
      'nombre': '',
      'apellido': '',
      'usuario': '',
      'contrasena': '',

      'telefono': '',

    }
  }

  //Funcion para validar usuario
  public validarUsuario(data: any){
    console.log("Validando user... ", data);
    let error: any = [];

    if(!this.validatorService.required(data["nombre"])){
      error["nombre"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["apellido"])){
      error["apellido"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["usuario"])){
      error["usuario"] = this.errorService.required;
    }else if(!this.validatorService.max(data["usuario"], 40)){
      error["usuario"] = this.errorService.max(40);
    }
    else if (!this.validatorService.validateName(data['usuario'])) {
      error['usuario'] = this.errorService.username;
    }

    if(!this.validatorService.required(data["contrasena"])){
      error["contrasena"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["telefono"])){
      error["telefono"] = this.errorService.required;
    }

    return error;
  }
public registrarUsuario(data: any) {
    return this.http.post('/api/registros.php', data);
  }



}
