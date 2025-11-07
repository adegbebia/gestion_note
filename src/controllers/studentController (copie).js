import { text, json } from "node:stream/consumers"; 
import uuid from "../generateur.js";


export default class StudentController {
    studentService;

    constructor(){
        this.studentService = new StudentService();
    }
    
    read(req, res) {
        res.writeHead(400);
        res.end(JSON.stringify(this.students));
    }

    get(req, res) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const id = url.searchParams.get("id");
        let student;
        this.students.forEach((elt) => {
            if (elt.id == id) {
                student = elt;
            }
        });

        if (id === undefined) {
            res.writeHead(400);
            res.end(JSON.stringify({
                "MESSAGE": 'Resource not found'
            }));
        } else {
            res.writeHead(200);
            res.end(JSON.stringify(student));
        }
    }

    

    // create(req, res) {
    //     json(req).then((body) => {
    //         this.students.push(body);
    //         console.log(this.students);
    //         res.end(JSON.stringify(this.students));
    //         //r
    // });

    async create(req, res) {
       const {fistname,lastname,sexe,birth_day}=await json(req);
       const student={
            'id':this.uuidgen.next().value,
            'fistname':fistname !== undefined ? fistname:"",
            'lastname':lastname !== undefined ? fistname:"",
            'sexe':sexe !== undefined ? sexe:"M",
            'birth_day':birth_day !== undefined ? fistname:"",
       };
            this.students.push(body);
            //console.log(this.students);
            res.end(JSON.stringify(this.students));
           
    };

    async create(req, res) {
    
    const { firstname, lastname, sexe, birthday } = await json(req);

    
    const newStudent = this.studentService.create({
        firstname,
        lastname,
        sexe,
        birthday
    });

    // Renvoie le nouvel étudiant créé
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newStudent));
}








    update(req, res) {
    // json(req).then((body) => {
    //     for (let i = 0; i < this.students.length; i++) {
    //         if (this.students[i].id == body.id) {
    //             this.students[i] = body;
    //             break; 
    //         }
    //     }
    //     console.log( this.students);
    //     res.end(JSON.stringify(this.students));
       
    // });

    const url = new URL(req.url,`http://${req.headers.host}`);
        console.log(url.searchParams.get("id"));
        let student;

        //Recherche de l'étudiant
        this.students.forEach((elt) =>{
            if (elt.id===id){
                student = elt;
            }

        })


        if (student === undefined){
            res.writeHead(404);
            res.end(JSON.stringify({
                "message": 'Resource not found!'
            }));
        }
        else{
            const {firstname,lastname,sexe,birthday} = await json(req);
            student.firstname = firstname !== undefined ? firstname :student.firstname,
            student.lastname = lastname !== undefined ? lastname : student.lastname,
            student.sexe = sexe !== undefined ? sexe : student.sexe,
            student.birthday = birthday !== undefined ? birthday : student.birthday,
            res.writeHead(200);
            res.end(JSON.stringify(student));
        }



    }



delete(req, res) {
    json(req).then((body) => {
        for (let i = 0; i < this.students.length; i++) {
            if (this.students[i].id == body.id) {
                this.students.splice(i, 1); 
                break; 
            }
        }
        console.log(this.students); 
        res.end(JSON.stringify(this.students));
       
    });
}

}





    
