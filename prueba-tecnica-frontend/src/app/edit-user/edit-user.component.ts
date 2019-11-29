import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User } from '../interfaces/user';
import swal from 'sweetalert';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  id: number;

  constructor(private route: ActivatedRoute,private api: ApiService) {
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
    this.id = parseInt( this.route.snapshot.paramMap.get("id"));
    this.api.getUser(this.id).subscribe(data => {
      this.user = data.user;
    }, error => {
      swal("Ooops..", "A ocurrido un error al recuperar el recurso", "warning");
    })
  }

  onSubmit() {
    console.log(this.user);
    this.api.editUser(this.id, this.user).subscribe(response => {
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
