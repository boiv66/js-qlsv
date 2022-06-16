import { studentArray } from "./model.js"

export class Validation{
    isEmpty(value){
        return value.toString().trim().length === 0; 
    }
 
    validateID(value){
        //check input empty 
        if (this.isEmpty(value)){
            return false; 
        }

        // check if add student existed
        for (const student of studentArray){
            if (value === student.studentId){
                return false; 
            }
           
        }
        return true; 

    }

    init(object){
        this.object = object; 
        const validateId = this.validateID(object.studentId); 
        
    }

    


}

export const validateInput = new Validation(); 