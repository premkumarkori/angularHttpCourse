import { Address } from "./address";
import { Company } from "./company";

export interface User {
    id?: number;
    name: string;
    username: string;
    email: string;
    isAdmin?: Object;
    address?: Address;
    phone: string;
    image?: string;
    website: string;
    company?: Company;
}

  

  

  

  