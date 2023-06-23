import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { EmployeeResponseDTO } from './EmployeeResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL;

  constructor(private httpClient: HttpClient) { }

  getEmployeesList(): Observable<EmployeeResponseDTO[]>{
    this.baseURL = "https://localhost:7278/api/Employee/GetAllEmployees"
    return this.httpClient.get<EmployeeResponseDTO[]>(`${this.baseURL}`);    
  }

  createEmployee(employee: Employee): Observable<Object>{
    this.baseURL = "https://localhost:7278/api/Employee/AddEmployee"
    return this.httpClient.post(`${this.baseURL}`, employee);
  }

  getEmployeeById(id: number): Observable<Employee>{
    this.baseURL = "https://localhost:7278/api/Employee/GetEmployeeById?empId"
    return this.httpClient.get<Employee>(`${this.baseURL}=${id}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<Object>{
    this.baseURL = "https://localhost:7278/api/Employee/UpdateEmployee?empId"
    return this.httpClient.put(`${this.baseURL}=${id}`, employee);
  }

  deleteEmployee(id: number): Observable<Object>{
    this.baseURL = "https://localhost:7278/api/Employee/DeleteEmployee?empId"
    return this.httpClient.delete(`${this.baseURL}=${id}`);
  }
}
