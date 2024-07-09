import passport from "passport";
import {Strategy} from 'passport-discord'
import { discordUser } from "./discord-user-schema.mjs";



export default passport.use(
    new Strategy({
        clientID: '1258680835121352789',
        clientSecret: 'XK-akxPbAfl_bNcUipqEvmXkmPqrO99U',
        callbackURL: 'http://localhost:3000/api/auth/discord/redirect',
        scope: ['identify', 'guilds'],
    }, async (accessToken, refreshToken, profile, done) => {
        let findUser;
        try {
            const findUser = await discordUser.find({discordId: profile.id});
        } catch (error) {
            return done(error, null)
        }

        try {
            if(!findUser) {
            const newUser = new discordUser({
                username: profile.username, 
                discordId: profile.id
            });
            const newSavedUser = await newUser.save();
            return done(null, newSavedUser);
            }
            return done(null, findUser); 
            
        } catch (error) {
            console.log(error);
            return done(error, null)
        }
                  
        }
    )
)

// serialize the user prodile id and keep it for requests for sessions
passport.serializeUser((profile, done) => {
    console.log("inside serializing user");
    console.log(profile)
    done(null, profile.id)

} )

// deserializing the user if coming with get request 
// finding the user in our discordUsers db and then performing operation

passport.deserializeUser(async (id, done) => {
    console.log("deserializing user ")
    try {
        const findUser = await discordUser.findById(id);
        if(!findUser) throw new Error("User not found");
        done(null, findUser);
    } catch (error) {
        done(error, null);
    }
});
