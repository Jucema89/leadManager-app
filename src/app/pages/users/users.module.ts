import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CreateUsersComponent } from './components/create-users/create-users.component';
import { UsersRoutingModule } from './users.routing.module';

@NgModule({
    imports: [
        CreateUsersComponent, UsersRoutingModule
    ]
})
export class UsersModule {

}
