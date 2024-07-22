import passport, { serializeUser } from "passport";
import { Strategy as LocalStrategy} from 'passport-local'
import { users } from "../constants.mjs";


// {usernameField: "username"},
export default passport.use(
    new LocalStrategy((username, password, done)=> {
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


// serializer to save user data to retrieve info later; 
// usually the id, we'll do the username for my learning purposes 
passport.serializeUser((user, done) => {
    done(null, user.username);
})


// deserializer to get associated data from username saved
passport.deserializeUser((username, done) => {
   try{
    const findUser = users.find((user) => users.username === username);
    if(!findUser) throw new Error("User not found");
    done(null, user);
   }catch{
    done(err, null);
   }
})

