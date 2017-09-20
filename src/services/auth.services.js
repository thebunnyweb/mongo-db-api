import passport from 'passport';
import LocalStartegy from 'passport-local';
import User from '../modules/users/users.model';

const localOpts = {
    usernameField:  'email'
}

const localStategy = new LocalStartegy(localOpts, async (email,password,done)=>{
    try {
        const user = await User.findOne({email})
        if(!user){
            return done(null, false)
        }else if(!user.authenticateUser(password)){
            return done(null, false)
        }
        return done(null, user);
    } catch (e) {
        return done(e, false)
    }
});


passport.use(localStategy);

export const authLogin = passport.authenticate('local', {session: false});



