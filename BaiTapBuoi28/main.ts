// Ex01
interface PartTime {
    id: number
    name: string
    salary: number
    hoursWorked: number
}
interface PartTime1 extends PartTime {}
const partTime: PartTime = {
    id: 2,
    name: "Binh",
    salary: 20,
    hoursWorked: 40
}
const partTime1: PartTime1 = {
   ...partTime,
    hoursWorked: 45
}

// Ex02
interface Employee {
    id: number
    name: string
    salary: number
    getSalary(): number
}
class FullTimeEmployee implements Employee {
    salary: number = 3000
    id: number = 1
    name: string = "Donald"
    getSalary(): number {
        return this.salary;
    }
}
class PartTimeEmployee implements Employee {
    id: number = 2
    name: string = "Mickey"
    salary: number = 25
    hoursWorked: number = 40
    getSalary(): number {
        return this.salary * this.hoursWorked
    }
}
function calculateTotalSalary(employees: Employee[]): number {
    if (!Array.isArray(employees)) {
        return 0 // Because the return type is number, I return 0 instead of a string.
    }
    let total = 0
    for (const employee of employees) {
        total += employee.getSalary();
    }
    return total
}
const fullTimeEmployee = new FullTimeEmployee()
const partTimeEmployee = new PartTimeEmployee()

const employees: Employee[] = [fullTimeEmployee, partTimeEmployee]
console.log(`Total Salary Employees: ${calculateTotalSalary(employees)}$`)
