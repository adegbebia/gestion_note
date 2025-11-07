import Repository from "./Repository.js"; 
import Database from "../config/database.js";

export default class StudentRepository extends Repository {
    constructor() {
        super();
    }

    static async save(student_data) {
        const db = await Database.getDatabaseInstance();

        if (parseInt(student_data.id) > 0) {
           
            const update_sql = `
                UPDATE students 
                SET firstname = :firstname, lastname = :lastname, sexe = :sexe, birthday = :birthday
                WHERE id = :id
            `;
            await db.connection.run(update_sql, {
                ':firstname': student_data.firstname,
                ':lastname': student_data.lastname,
                ':sexe': student_data.sexe,
                ':birthday': student_data.birthday,
                ':id': student_data.id
            });
            return student_data.id;
        } else {
          
            const insert_sql = `
                INSERT INTO students (firstname, lastname, sexe, birthday)
                VALUES (:firstname, :lastname, :sexe, :birthday)
            `;
            const result = await db.connection.run(insert_sql, {
                ':firstname': student_data.firstname,
                ':lastname': student_data.lastname,
                ':sexe': student_data.sexe,
                ':birthday': student_data.birthday
            });
            return result.lastID;
        }
    }

    static async delete(id) {
        const db = await Database.getDatabaseInstance();
        await db.connection.run(
            "DELETE FROM students WHERE id = :id;",
            { ':id': id }
        );
    }
}
