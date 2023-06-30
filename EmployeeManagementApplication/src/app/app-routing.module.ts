import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { CommonModule } from '@angular/common';


const routes: Routes = [  
  {path: 'employee', component: EmployeeListComponent},
  {path: 'create', component: CreateEmployeeComponent},
  {path: 'edit/:id', component: CreateEmployeeComponent},
  {path: '', redirectTo: 'employee', pathMatch: 'full'}, 
  {path: '**', redirectTo: 'employee', pathMatch: 'full'},   
];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
