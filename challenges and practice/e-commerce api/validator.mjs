import { ExpressValidator } from "express-validator";



export const createUserValidationSchema = {
    username: {
        isLength: {options:{
            min:5,
            max:10
        },
        errorMessage: "Username must be between 5 and 10 characters"
        },
        notEmpty: {
            notEmpty: true,
            errorMessage: "Username must be between 5 and 10 characters"
        },
        isString: {
            isString: true,
            errorMessage: "Username must be a string no special characters"
        },
        exists: {
            errorMessage: "Username exists choose another name please"
        }
        
    },
    email: {
        
    }
};



