import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal, { SweetAlertIcon } from 'sweetalert2';

export interface Instructor {
  cedula: string
  nombre: string
  fecha_nacimiento: string
  sexo: string
  especialidad: string
  horario: []
  direccion: string
  estatus: boolean
}
@Injectable({
  providedIn: 'root'
})


export class EmpresaService {

  constructor() { }
}
