import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { users } from '../constants.mjs';

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const findUser = users.find(user => user.username === username);
            if (!findUser) {
                return done(null, false, { message: 'User not found' });
            }
            console.log(`Comparing password for user: ${username}`);
            const match = await bcrypt.compare(password, findUser.password);
            if (!match) {
                return done(null, false, { message: 'Invalid password' });
            }
            return done(null, findUser);
        } catch (err) {
            return done(err);
        }
    }
));
