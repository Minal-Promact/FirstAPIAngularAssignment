
export interface EmployeeRequestDTO {
    id: number;
    name: string;
    gender: number;
    contactNumber: string;
    email: string
    skills:SkillRequestDTO[];
}

export interface SkillRequestDTO{    
    skillName:string;
    skillExperience:number;
    employeeId:number;    
}