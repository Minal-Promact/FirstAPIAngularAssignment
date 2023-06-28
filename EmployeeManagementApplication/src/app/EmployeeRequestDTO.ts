import { DecimalPipe } from "@angular/common";

export interface EmployeeRequestDTO {
    id: number;
    name: string;
    gender: string;
    contactNumber: string;
    email: string
    skills:SkillRequestDTO[];
}

export interface SkillRequestDTO{    
    skillName:string;
    skillExperience:DecimalPipe;
    employeeId:number;    
}