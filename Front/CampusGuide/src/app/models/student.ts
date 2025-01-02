import { User } from "./user";

export interface Student extends User {
    level: number;
    field: string;
    specialty: string;
}
