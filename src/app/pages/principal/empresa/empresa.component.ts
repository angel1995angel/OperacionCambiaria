import { Component, OnInit } from '@angular/core';
import { Instructor } from 'src/app/services/bdv/empresa.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApiService, IAPICore } from 'src/app/services/apicore/api.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  public Instructor : Instructor = {
    cedula: '',
    nombre: '',
    fecha_nacimiento: '',
    sexo: '',
    especialidad: '',
    direccion: '',
    estatus: false,
    horario: []
  }
  
  public _insert : string = ''
  public _search : string = 'none'

  public lstInstructores = []

  public xAPI: IAPICore = {
    funcion: '',
    parametros: ''
  }
  
  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
  }

  consultar(){}

  atras(){
    this._insert = ''
    this._search = 'none'
  }

  editar(e) {
    this.Instructor = e
    this._insert = ''
    this._search = 'none'
  }


  Seleccionar(){
    this.Listar()
    this._insert = 'none'
    this._search = ''
  }
  
  Listar() {
    this.xAPI.funcion = "SEDE_LIntructores"
    this.xAPI.parametros = ''
    this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        if (data != null && data.msj == undefined) this.lstInstructores = data
      },
      (error) => {
        console.log(error)
        this.Limpiar()
      }
    )
  }

  Consultar() {

    this.xAPI.funcion = "SEDE_CInstructor"
    this.xAPI.parametros = this.Instructor.cedula

    this.apiService.Ejecutar(this.xAPI).subscribe(
      (data) => {
        console.log(data)
        if (data != null && data.msj == undefined) {
          this.Instructor = data[0]
        } else {
          let aux = this.Instructor.cedula
          this.Limpiar()
          this.Instructor.cedula = aux
        }
      },
      (error) => {
        console.log(error)
        this.Limpiar()
      }
    )
  }

  Guardar() {

    if (this.Instructor.cedula == "") {
      this._snackBar.open('Debe verificar todos los campos...', 'OK')
      return
    }
    this.ngxService.startLoader('load-inver')
    var obj = {
      "coleccion": "instructores",
      "objeto": this.Instructor,
      "donde": `{\"cedula\":\"${this.Instructor.cedula}\"}`,
      "driver": "MDBSEDE",
      "upsert": true
    }
    //this.apiService.ExecColeccion(obj).subscribe(
     // (data) => {
      //  console.log(data)
       // this.apiService.Mensaje('Proceso exitoso', 'Felicitaciones', 'success', 'inversion')
       // this.ngxService.stopLoader('load-inver')
       // this.Limpiar()
      //},
     // (error) => {
      //  console.log(error)
     // }
    //)
  }

  Limpiar(){
    this.Instructor = {
      cedula: '',
      nombre: '',
      fecha_nacimiento: '',
      sexo: '',
      especialidad: '',
      horario: [],
      direccion: '',
      estatus : false
    }
  }
}
