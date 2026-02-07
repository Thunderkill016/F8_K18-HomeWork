import { ClassRoom } from "./classroom";
import { Student } from "./student";

const classRoom = new ClassRoom("Lớp JS Cơ Bản");

const an = new Student(1, "An");
const binh = new Student(2, "Bình");
const chi = new Student(3, "Chi");

classRoom.addStudent(an);
classRoom.addStudent(binh);
classRoom.addStudent(chi);

classRoom.postAnnouncement("Mai kiểm tra OOP");
