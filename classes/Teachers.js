export class Teachers {
    #password
    constructor(email,password,name){
        this.email = email
        this.#password = password;
        this.name = name;
        this.students = []


    }

    addStudent(...students){
        students.forEach((student) => {
          this.students.push({...student})
        })
        return this
    }

    toObject(){
        return {
            name:this.name,
            email : this.email,
            password: this.#password,
            alunos : this.students
        }
    }
    
}
