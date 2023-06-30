import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs';
import { Employee } from '../shared/employee';
import { EmployeeResponseDTO } from '../shared/EmployeeResponseDTO';
import { EmployeeRequestDTO } from '../shared/EmployeeRequestDTO';

const httpOptions = {
  headers: new HttpHeaders({
     'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL="/api/Employee";

  constructor(private httpClient: HttpClient) { }

  //get list of employee
  getEmployeesList(): Observable<EmployeeResponseDTO[]>{
    this.baseURL = "/api/Employee"
    return this.httpClient.get<EmployeeResponseDTO[]>(`${this.baseURL}`);    
  };

  //post employee data
  createEmployee(addEmployeeRequest: EmployeeRequestDTO): Observable<EmployeeRequestDTO> {
    debugger
    return this.httpClient.post<EmployeeRequestDTO>(this.baseURL, addEmployeeRequest)
       .pipe(
          catchError(this.handleError)
       );
 };

 //get employee data by Id
 getEmployeeById(id: number): Observable<Employee> {

  const url = `${this.baseURL}/${id}`

  return this.httpClient.get<Employee>(url)
     .pipe(
        catchError(this.handleError)
     );

};

//put employee data
updateEmployee(id: number, update: EmployeeRequestDTO): Observable<EmployeeRequestDTO> {

  const url = `${this.baseURL}/${id}`;
  return this.httpClient.put<EmployeeRequestDTO>(url, update, httpOptions)
     .pipe(
        catchError(this.handleError)
     );

};

//Delete employee data
deleteEmployee(id: number): Observable<{}> {

  const url = `${this.baseURL}/${id}`;
  return this.httpClient.delete(url, httpOptions)
     .pipe(
        catchError(this.handleError)
     );
};

  
//Handle error
  private handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {

       // A client-side or network error occurred.

       console.error('An error occurred:', error.error.message);

    } else {

       // Server error

       console.error(

          `Backend returned code ${error.status}, ` +

          `body was: ${error.error}`);

    }

    return throwError(

       'Something bad happened; please try again later.');

 }
}
