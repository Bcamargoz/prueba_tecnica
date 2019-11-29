import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User } from '../interfaces/user';
import swal from 'sweetalert';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  
  user: User;
  

  constructor(private api: ApiService) {
    this.initModel();
  }

  initModel() {
    this.user = {
      nombres: '',
      apellidos: '',
      cedula: '',
      correo: '',
      telefono: ''
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.user);
    this.api.createUser(this.user).subscribe(response => {
        swal("Guardado", "Se ha guardado correctamente", "success");
        this.initModel();
    }, error => {
      const errorFields = Object.keys(error.error.errors);
      const errors = error.error.errors;
      let errorFielsMessage = [];
      errorFields.forEach(field => {
        console.log("campos", field);
        if(field == 'cedula' || field == 'correo') {
          console.log("datos", errors[field]);
          let extra = "";
          errors[field].forEach(response => {
            if(response.includes("already been taken")){
              extra = " (Ya se encuentra registrado)";
            }
          });
          errorFielsMessage.push(field + extra);
        } else {
          errorFielsMessage.push(field);
        }
      });
      let message = "No se ha podido guardar, por favor verifica los campos: "+ errorFielsMessage.join(',') ;
      swal("Espera", message, "warning");
        console.log(error.error.errors);
    })
  }

}
