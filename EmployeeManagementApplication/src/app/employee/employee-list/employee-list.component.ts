import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgConfirmService } from 'ng-confirm-box';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeResponseDTO } from 'src/app/shared/EmployeeResponseDTO';
import { Gender } from 'src/app/shared/enum';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {    

  public lstEmployeeResponseDTO: EmployeeResponseDTO[] = [];

  constructor(private employeeService: EmployeeService,
    private router: Router,private confirmService: NgConfirmService,private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.getEmployees();
  };

  //Get list of employee for display on ui
  private getEmployees() {
    this.employeeService.getEmployeesList().subscribe(
      data => {        
        this.lstEmployeeResponseDTO = data;
        this.lstEmployeeResponseDTO.forEach(a=>{
          a.gender = Object.keys(Gender)[Object.values(Gender).indexOf(a.gender)]          
        })
        console.log(this.lstEmployeeResponseDTO)
      });
  };

  //redirect for edit by Id 
  updateEmployee(id: number) {    
    this.router.navigate(['edit',id]);
  };

  //Delete employee record by Id
  deleteEmployee(id: number,name:string) {
    this.confirmService.showConfirm("Are you sure you want to delete " + name + " ?",
    ()=>{
      this.employeeService.deleteEmployee(id).subscribe(data => {
        this.showSuccessWithTimeout("The Employee " + name + " is deleted successfully.","Success",2000);                
        this.getEmployees();
      },error => console.log(error))      
    },
    ()=>{
    }
    );    
  }; 
  
  //Show message with time interval
  showSuccessWithTimeout(message, title, timespan){
    this.toastr.success(message, title ,{
      timeOut :  timespan
    })
  };

}
