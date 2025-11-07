export default  class Repository {
    constructor() {
        
        // console.log(new.target);
        if (new.target==Repository) {
             throw new Error("Cette classe n'est pas instanciable");
            
        }
    }

    static save(student_data) {
        console.log("La méthode 'save' ne peut pas être utilisée");
    }

    static delete(id) {
        console.log("La méthode 'delete' ne peut pas être utilisée");
    }

    static find(id) {
        console.log("La méthode 'find' ne peut pas être utilisée");
    }

    static findAll() {
        console.log("La méthode 'findAll' ne peut pas être utilisée");
    }
}
