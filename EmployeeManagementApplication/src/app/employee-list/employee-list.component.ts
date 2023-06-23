import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee'
import { EmployeeService } from '../employee.service'
import { Router } from '@angular/router';
import { EmployeeResponseDTO } from '../EmployeeResponseDTO';
import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {    

  public lstEmployeeResponseDTO: EmployeeResponseDTO[] = [];

  constructor(private employeeService: EmployeeService,
    private router: Router,private confirmService: NgConfirmService) {

  }

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees() {
    this.employeeService.getEmployeesList().subscribe(
      data => {
        debugger;
        this.lstEmployeeResponseDTO = data;
        console.log(this.lstEmployeeResponseDTO)
      });
  }

  employeeDetails(id: number) {
    this.router.navigate(['employee-details', id]);
  }

  updateEmployee(id: number) {
    this.router.navigate(['create-employee', id]);
  } 

  deleteEmployee(id: number,name:string) {
    this.confirmService.showConfirm("Are you sure you want to delete " + name + " ?",
    ()=>{
      this.employeeService.deleteEmployee(id).subscribe(data => {
        alert("The Employee " + name + " is deleted successfully.");        
        this.getEmployees();
      },error => console.log(error))
      setTimeout(() => {        
      }, 2000);
    },
    ()=>{
    }
    );    
  }  

}
