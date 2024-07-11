export interface Lead {
    id: string;
    id_row: number
    agendacion: Date;
    email: string;
    utm_source: string;
    utm_campaign: string;
    utm_medium: string;
    utm_term: string;
    utm_content: string;
    state: StateLead;
    closerId: string;
    closer: User
    closer_name: string
    createdAt: Date;
    updatedAt: Date;
}

export type LeadCreate = Omit<Lead, 'id' | 'createdAt' | 'updatedAt'> 

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    password: string;
    leadsAssign: Lead[];
    createdAt: string;
    updatedAt: string;
}

export type UserCreate = Omit<User, 'id' | 'role' | 'password' | 'createdAt' | 'updatedAt' | 'leadsAssign'>

export interface LeadResponse {
    success: boolean;
    data: Lead[] | Lead;
}

export type Role = 'ADMIN' | 'CLOSER'
export type StateLead =  'unmanaged' | 'contacted' | 'await_answer' | 'in_call' | 'win' | 'lose'

