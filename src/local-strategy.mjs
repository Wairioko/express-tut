import passport from "passport";
import { Strategy } from 'passport-local'
import { users } from "../constants.mjs";

// {usernameField: "username"},
passport.use(
    new Strategy((username, password, done)=> {
        try{
        const findUser = users.find((user) => user.username === username);
        if (!findUser) return console.log("User not found");
        } catch (err){
        if (password === findUser.password){
            return done()
        }
        else{
            throw new Error("Invalid password");
        }
    }
    })
)

