import { Person } from "./person";

export interface Task {
    id?:number
    name: string,
    date: Date,
    persons: Person[],
    state: string
}
