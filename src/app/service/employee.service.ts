import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';

@Injectable()
export class EmployeeService {

  private employeesUrl: string;

  constructor(private http: HttpClient) {
    this.employeesUrl = 'http://localhost:8080/employees';
  }

  public findAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl);
  }

  public createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeesUrl, employee);
  }
  

  public removeEmployeeById(id: string) {
    return this.http.delete(`${this.employeesUrl}/${id}`);
  }
  public findEmployeeById(id: string) {
    return this.http.get(`${this.employeesUrl}/${id}`);
  }




}