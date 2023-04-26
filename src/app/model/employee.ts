import { Address } from "./address";
import { Skill } from "./skill";

export class Employee {
    id!: string;
    firstName!: string;
    lastName!: string;
    contactEmail?: string;
    companyEmail!: string;
    birthDate!: string;
    hiredDate!: string;
    address!: Address;
    skills?: Skill[];
    assignedTo?: string;
    role!: string;
    businessUnit?: string;




}