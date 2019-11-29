import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { User } from '../interfaces/user';
import swal from 'sweetalert';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: Array<User> = [];

  constructor(private api: ApiService) {
    this.users = [];
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.api.getRemoteUsers().subscribe(users => {
      console.log(users);
      this.users = users
    });
  }

  deleteUser(id: number) {
    this.api.deleteUser(id).subscribe(users => {
      swal("Eliminado", "Se ha eliminado correctamente", "success");
      this.loadUsers();
    }, error => {
      swal("Ooops", "No se ha podido eliminar", "warning");
    });
  }

}
