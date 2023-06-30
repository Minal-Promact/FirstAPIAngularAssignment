
export interface Employee {
    id: number;
    name: string;
    gender: number;
    contactNumber: string;
    email: string
    skills:skill[];
}

export interface skill{    
    skillName:string;
    skillExperience:number;    
}


