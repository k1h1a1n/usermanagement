import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo:'user-management', pathMatch:'full'},
  {path: 'user-management', loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule)
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
