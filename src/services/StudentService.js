import uuid from "../generateur.js";
import StudentRepository from "../repository/StudentRepository.js";

export default class StudentService {

    uuidGen;
    studentRepository;

    constructor() {
        this.studentRepository = new StudentRepository();
        this.uuidGen = uuid(1000);
    }

    async getAll() {
        return await this.studentRepository.findAll();
    }

    async get(id) {
        return await this.studentRepository.find(id);
    }

    async create(student_data) {
        return await this.studentRepository.save(student_data);
    }

    async update(id, student_data) {
        const student = await this.studentRepository.find(id);
        if (!student) return null;

        const { firstname, lastname, sexe, birthday } = student_data;
        const updatedStudent = {
            id,
            firstname: firstname ?? student.firstname,
            lastname: lastname ?? student.lastname,
            sexe: (sexe === "M" || sexe === "F") ? sexe : student.sexe,
            birthday: birthday ?? student.birthday
        };

        await this.studentRepository.save(updatedStudent);
        return updatedStudent;
    }

    async delete(id) {
        await this.studentRepository.delete(id);
    }
}
