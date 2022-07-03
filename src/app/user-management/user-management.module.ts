import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserListComponent } from './component/user-list/user-list.component';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    MatTableModule,
    MatIconModule,
    CommonModule,
    UserManagementRoutingModule,
    MatPaginatorModule
  ]
})
export class UserManagementModule { }
