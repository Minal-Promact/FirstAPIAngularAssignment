import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service'
import { Employee } from '../../shared/employee'
import { EmployeeRequestDTO } from '../../shared/EmployeeRequestDTO';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})

export class CreateEmployeeComponent implements OnInit {  

  empId: number;
  empForm: FormGroup; 
  employee: Employee = {
    id: null,
    name: "",
    email: "",
    gender: null,
    contactNumber: "",
    skills: []
  };
  employeeRequest: EmployeeRequestDTO;

  isAddMode: boolean;
  submitted = false;
  isShowRemoveBtn: Boolean;
  mode: string;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService) {
    this.createForm();
    this.isShowRemoveBtn = false;
  }

  ngOnInit(): void {
    debugger

    this.route.params.subscribe(params => {
      this.mode = params['id'] ? 'edit' : 'create';

      if (this.mode === 'edit') {
        // Fetch data for editing using the provided ID

        this.empId = params['id'];
        this.isAddMode = !this.empId;       
        this.GetEmployeeById();
        
      } else {
        // Initialize data for creating
        this.isAddMode = true;     

      }
    });
  }; 

  //Create form and set validation
  createForm() {
    this.empForm = new FormGroup({
      id: new FormControl("", [Validators.required, Validators.pattern('^[0-9]+$')]),
      name: new FormControl("", [Validators.required,
      Validators.minLength(15),
      Validators.pattern('^[a-zA-Z \-\']+')]),
      contactNumber: new FormControl("", [Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
      Validators.pattern('^[0-9]+$')]),
      email: new FormControl("", [Validators.required, Validators.email,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]),
      gender: new FormControl("0", [Validators.required]),
      skills: new FormArray([
        new FormGroup({
          skillName: new FormControl('', [Validators.required]),
          skillExperience: new FormControl('', [Validators.required])
        })
      ])
    });
  };

  //Add new skill
  addNewSkill() {
    const control = <FormArray>this.empForm.controls['skills'];
    control.push(
      new FormGroup({
        skillName: new FormControl(''),
        skillExperience: new FormControl('')
      })
    )
    this.isShowRemoveBtn = true;
  };

  //Remove skill by index
  removeSkill(index) {
    const control = <FormArray>this.empForm.controls['skills'];
    if (index != 0) {
      control.removeAt(index);
    }
    if (index == 0) {
      this.isShowRemoveBtn = false;
    }
  };

  //Display value to form
  showForm(employee: Employee) {
    debugger;
    this.showFormArray(employee);
    this.empForm.patchValue({
      id: employee.id,
      name: employee.name,
      contactNumber: employee.contactNumber,
      email: employee.email,
      gender: employee.gender.toString(),
      skills: employee.skills
    })
  };

  showFormArray(employee: Employee) {
    debugger;
    for (let i = 0; i < employee.skills.length - 1; i++) {
      this.addNewSkill();
    }
  };

  Save() {
    debugger

    this.employeeService.createEmployee(this.empForm.value).subscribe(data => {
      console.log(data);
      this.goToEmployeeList();
    },
      error => console.log(error));
  };

  GetEmployeeById() {
    debugger
    this.employeeService.getEmployeeById(this.empId).subscribe(data => {
      this.employee = data;
      this.showForm(this.employee);
    }, error => console.log(error));
  };

  Update() {
    debugger;
    this.employeeService.updateEmployee(this.empId, this.empForm.value).subscribe(data => {
      console.log(data);
      this.goToEmployeeList();
    },
      error => console.log(error));
  };

  get f() { return this.empForm.controls; };

  onSubmit() {
    this.submitted = true;
    if (this.empForm.value.id == "") {
      return;
    };

    if (this.isAddMode) {
      this.Save();
    } else {
      this.Update();
    }
  };

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  };

  public validate(): void {
    if (this.empForm.invalid) {
      for (const control of Object.keys(this.empForm.controls)) {
        this.empForm.controls[control].markAsTouched();
      }
      return;
    }
  };
}
