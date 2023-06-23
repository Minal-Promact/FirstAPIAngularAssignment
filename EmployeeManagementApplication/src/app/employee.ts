import { DecimalPipe } from "@angular/common";

export interface Employee {
    id: number;
    name: string;
    gender: string;
    contactNumber: string;
    email: string
    skills:skill[];
}

export interface skill{    
    skillName:string;
    skillExperience:DecimalPipe;    
}


