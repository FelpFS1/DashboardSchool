export class Students{
    #media = null
    constructor(name,grades){
        this.name = name;
        this.grades = grades
        this.situation = "Pendente"
        this.calculateMedia()
        this.studentSituation()
        
    }

    calculateMedia(){
        this.#media = this.grades.reduce((acc,note) => acc += note,0) / this.grades.length
    }

    studentSituation(){
    if(this.grades.length === 4){
        if(this.#media > 6){
            this.situation = "Aprovado"
            return 
        }else{
            this.situation = "Reprovado"
            return
        }
    }{
        this.situation = "Pendente"
    }
       
    }

    showMedia(){
        return this.#media
    }

    toObject(){
        return{
            name: this.name,
            notas: this.grades,
            situation: this.situation
        }
    }
}




