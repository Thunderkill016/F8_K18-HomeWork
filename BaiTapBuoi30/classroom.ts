import { Student } from "./student";

export interface ClassRoomI {
    addStudent: (student: Student) => Student[];
    removeStudent: (student: Student) => Student[];
    notify: (message: string) => void;
    postAnnouncement: (message: string) => void;
}

export class ClassRoom implements ClassRoomI {
    private name: string;
    private students: Student[] = [];
    constructor(name: string) {
        this.name = name;
    }

    addStudent(student: Student) {
        this.students.push(student);
        return this.students;
    }
    removeStudent(student: Student) {
        this.students = this.students.filter(
            (students) => students !== student
        );
        return this.students;
    }
    notify(message: string) {
        this.students.forEach(student => student.update(message))
    }
    postAnnouncement(message: string) {
        console.log(`${this.name} có thông báo mới`);
        this.notify(message);
    }
}
