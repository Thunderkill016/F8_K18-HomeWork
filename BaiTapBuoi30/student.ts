export interface StudentI {
    setName(name: string): void

    getName(): string

    update(message: string): void
}

export class Student implements StudentI {
    private id: number
    private name: string

    constructor(id: number, name: string) {
        this.id = id
        this.name = name
    }

    setName(name: string): void {
        this.name = name
    }

    getName(): string {
        return this.name
    }

    update(message: string): void {
        console.log(`Học sinh ${this.name} nhận được: ${message}`)
    }
}
