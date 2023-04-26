import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee';
import { Address } from '../model/address';
import { Skill } from '../model/skill';
import { Field } from '../model/field';
import { EmployeeService } from '../service/employee.service';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  public searchTerm: string = '';

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.employeeService.findAll().subscribe((data: Employee[]) => {
      this.employees = data;
    });
  }
    onDelete(id: string): void {
    if (!id) {
      return;
    }
  
    this.employeeService.removeEmployeeById(id)
      .subscribe(() => {
        console.log(`Employee with ID ${id} deleted successfully`);
        this.employees = this.employees?.filter((e) => e.id !== id);
      }, (error) => {
        console.error(`Error deleting employee with ID ${id}`, error);
      });
  }
  get filteredEmployees(): Employee[] {
    if (!this.searchTerm) {
      return this.employees || [];
    }
    return this.employees?.filter(employee => employee.id.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
  
  
  
  
  
  
  
  onCreate(employeeToCreate: Employee): void {
    const address = new Address();
    address.id = employeeToCreate.address?.id;
    address.street = employeeToCreate.address?.street;
    address.suite = employeeToCreate.address?.suite;
    address.city = employeeToCreate.address?.city;
    address.region = employeeToCreate.address?.region;
    address.postal = employeeToCreate.address?.postal;
    address.country = employeeToCreate.address?.country;
  
    const skills: Skill[] = [];
    employeeToCreate.skills?.forEach((skill: any) => {
      const newSkill = new Skill();
      newSkill.field = skill.field
      newSkill.id = skill.id;
      newSkill.experience = skill.experience;
      newSkill.summary = skill.summary;
      skills.push(newSkill);
    });
  
    const employee = new Employee();
    employee.firstName = employeeToCreate.firstName;
    employee.lastName = employeeToCreate.lastName;
    employee.contactEmail = employeeToCreate.contactEmail;
    employee.companyEmail = employeeToCreate.companyEmail;
    employee.birthDate = employeeToCreate.birthDate;
    employee.hiredDate = employeeToCreate.hiredDate;
    employee.address = address;
    employee.skills = skills;
    employee.assignedTo = employeeToCreate.assignedTo;
    employee.role = employeeToCreate.role;
    employee.businessUnit = employeeToCreate.businessUnit;
  
    this.employeeService.createEmployee(employee)
  .subscribe((createdEmployee: Employee) => {
    console.log(`Employee with ID ${createdEmployee.id} created successfully`);
    // TODO: navigate to the employee list or update the list in the UI
  }, (error) => {
    console.error(`Error creating employee: ${error}`);
  });

  }
  

  

}
