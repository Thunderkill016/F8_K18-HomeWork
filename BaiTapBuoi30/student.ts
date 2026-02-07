export interface StudentI {
    id: number
    name: string
    update(msg: string): void
}

export class Student implements StudentI {
    id: number
    name: string

    constructor(id: number, name: string) {
        this.id = id
        this.name = name
    }

    update(msg: string) {
        console.log(`${this.name} received message: ${msg}`)
    }
}
