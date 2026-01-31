abstract class Employee {
    protected id: number
    protected name: string
    protected salary: number

    constructor(id: number, name: string, salary: number) {
        this.id = id
        this.name = name
        this.salary = 0
        this.setSalary(salary)
    }

    getId(): number {
        return this.id
    }

    getName(): string {
        return this.name
    }

    setName(name: string): void {
        this.name = name
    }

    getSalary(): number {
        return this.salary
    }

    setSalary(salary: number): void {
        if (salary <= 0) {
            console.log("Salary must be greater than 0")
            return
        }
        this.salary = salary
    }

    abstract calculateSalary(): number
}

// Developer
class Developer extends Employee {
    private overtimeHours: number

    constructor(
        id: number,
        name: string,
        salary: number,
        overtimeHours: number
    ) {
        super(id, name, salary)
        this.overtimeHours = overtimeHours
    }

    calculateSalary(): number {
        return this.salary + this.overtimeHours * 50000
    }
}

// Manager
class Manager extends Employee {
    private teamSize: number

    constructor(
        id: number,
        name: string,
        salary: number,
        teamSize: number
    ) {
        super(id, name, salary)
        this.teamSize = teamSize
    }

    calculateSalary(): number {
        return this.salary + this.teamSize * 200000
    }
}

const dev = new Developer(1, "Ryan Gigs", 5_000_000, 17)
console.log(dev.calculateSalary())

const manager = new Manager(2, "David Egg", 10_000_000, 4)
console.log(manager.calculateSalary())

