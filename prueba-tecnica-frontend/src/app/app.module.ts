import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListUserComponent } from './list-user/list-user.component';

import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { 
    path: 'inicio',
    component: AppComponent,
    data: { title: 'Inicio' }
  },
  { 
    path: 'list-users',
    component: ListUserComponent,
    data: { title: 'Users List' }
  },
  {
    path: 'create-user',
    component: CreateUserComponent
  },
  { 
    path: 'edit-user/:id',
    component: EditUserComponent
  },
  { path: '',
    redirectTo: '/list-users',
    pathMatch: 'full'
  },
  { path: '**', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    EditUserComponent,
    ListUserComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
