export interface StudentI {
    setName(name: string): void;
    getName(): string;
    update(message: string): void; // fixed typo
}

export class Student implements StudentI {
    private id: number;
    private name: string;

    constructor(id: number, name: string) { // fixed constructor
        this.id = id;
        this.name = name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    update(message: string): void { // fixed typo
        console.log(`Học sinh ${this.name} nhận được: ${message}`);
    }
}
