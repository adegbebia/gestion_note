import { json } from "node:stream/consumers"; 
import StudentService from "../services/StudentService.js"; 
import { HTTP_STATUS_CODE } from '../contantes/httpStatus.js';

export default class StudentController {
    studentService;

    constructor() {
        this.studentService = new StudentService();
    }

    async read(req, res) {
        const students = await this.studentService.getAll();
        res.writeHead(HTTP_STATUS_CODE.SUCCESS, { "Content-Type": "application/json" });
        res.end(JSON.stringify(students));
    }

    async get(req, res) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const id = parseInt(url.searchParams.get("id"));
        const student = await this.studentService.get(id);

        if (!student) { 
            res.writeHead(HTTP_STATUS_CODE.NOT_FOUND, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: 'Resource not found' }));
        } else {
            res.writeHead(HTTP_STATUS_CODE.SUCCESS, { "Content-Type": "application/json" });
            res.end(JSON.stringify(student));
        }
    }

    async create(req, res) {
        const { firstname, lastname, sexe, birthday } = await json(req);
        const student = {
            firstname: firstname !== undefined ? firstname : "",
            lastname: lastname !== undefined ? lastname : "",
            sexe: (sexe === "M" || sexe === "F") ? sexe : "M",
            birthday: birthday !== undefined ? birthday : ""
        };

        const newStudent = await this.studentService.create(student);
        res.writeHead(HTTP_STATUS_CODE.CREATED, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newStudent));
    }

    async update(req, res) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const id = parseInt(url.searchParams.get("id")); 
        const { firstname, lastname, sexe, birthday } = await json(req);

        const student = {
            firstname: firstname !== undefined ? firstname : "",
            lastname: lastname !== undefined ? lastname : "",
            sexe: (sexe === "M" || sexe === "F") ? sexe : "M",
            birthday: birthday !== undefined ? birthday : ""
        };

        const updatedStudent = await this.studentService.update(id, student);

        if (updatedStudent) {
            res.writeHead(HTTP_STATUS_CODE.SUCCESS, { "Content-Type": "application/json" });
            res.end(JSON.stringify(updatedStudent));
        } else {
            res.writeHead(HTTP_STATUS_CODE.NOT_FOUND, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Resource not found!" }));
        }
    }

    async delete(req, res) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const id = parseInt(url.searchParams.get("id")); 
        await this.studentService.delete(id);

        res.writeHead(HTTP_STATUS_CODE.SUCCESS, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: `Student with ID ${id} deleted` }));
    }
}
