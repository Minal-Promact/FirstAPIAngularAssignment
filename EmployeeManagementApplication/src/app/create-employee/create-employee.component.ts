import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder,Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service'
import { Employee } from '../employee'
import { EmployeeRequestDTO } from '../EmployeeRequestDTO';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit{
  
  empId: number;
  empForm: FormGroup;
  employee: Employee ={
    id: null,
    name: "",
    email: "",
    gender: "",
    contactNumber: "",
    skills:[] 
   }; 
   employeeRequest:EmployeeRequestDTO;

  isAddMode: boolean; 
  submitted = false;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router:Router,
    private employeeService: EmployeeService) {
    this.createForm();
}

  ngOnInit(): void{   
    debugger
    this.empId = this.route.snapshot.params['id']; 
    this.isAddMode = !this.empId; 

    if (!this.isAddMode) { 
      debugger;
             this.GetEmployeeById();             
    }

  }  

  createForm(){
    this.empForm = new FormGroup({
      id: new FormControl("", [Validators.required]),
      name:new FormControl("",[Validators.required]),
      contactNumber:new FormControl("",[Validators.required]),
      email:new FormControl("",[Validators.required]),
      gender:new FormControl("Male",[Validators.required]),
      skills: new FormArray([
        new FormGroup({
          skillName: new FormControl('',[Validators.required]),
          skillExperience: new FormControl('',[Validators.required])
        })
      ])
    });
  } 
  
  addNewSkill(){
    const control = <FormArray>this.empForm.controls['skills'];
    control.push(
      new FormGroup({
        skillName: new FormControl(''),
        skillExperience: new FormControl('')
      })
    )
  }

  removeSkill(index){
    const control = <FormArray>this.empForm.controls['skills'];
    if(index !=0){
     control.removeAt(index);
    }
  }  

  showForm(employee:Employee){
    debugger;    
    this.showFormArray(employee);
    this.empForm.patchValue({
      id:employee.id,
      name:employee.name,
      contactNumber:employee.contactNumber,
      email:employee.email,
      gender:employee.gender,
      skills:employee.skills     
    })    
  }
  showFormArray(employee:Employee){
     debugger;    
    
    for(let i=0;i< employee.skills.length-1;i++)
    {
       this.addNewSkill();
    }

  }
  
  Save(){
    debugger    
    
    this.employeeService.createEmployee(this.empForm.value).subscribe( data =>{
      console.log(data);
      this.goToEmployeeList();
    },
    error => console.log(error));
  }

  GetEmployeeById()
  {
      this.employeeService.getEmployeeById(this.empId).subscribe(data => {
      this.employee = data;
      this.showForm(this.employee);
    }, error => console.log(error));    
  }

  Update(){
    
    debugger;    
    this.employeeService.updateEmployee(this.empId,this.empForm.value).subscribe( data =>{
      console.log(data);
      this.goToEmployeeList();
    },
    error => console.log(error));
  }

  get f() { return this.empForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.empForm.value.id =="") {
        return;
    };

    if (this.isAddMode) {
      this.Save();
  } else {
      this.Update();
  }
  }

  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }

  public validate(): void {
    if (this.empForm.invalid) {
      for (const control of Object.keys(this.empForm.controls)) {
        this.empForm.controls[control].markAsTouched();
      }
      return;
    }
  }
}
