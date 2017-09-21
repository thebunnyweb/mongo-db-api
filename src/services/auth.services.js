import passport from 'passport';
import LocalStartegy from 'passport-local';
import User from '../modules/users/users.model';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import constants from '../config/constants';

const localOpts = {
  usernameField: 'email',
};

const localStategy = new LocalStartegy(
  localOpts,
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false);
      } else if (!user.authenticateUser(password)) {
        return done(null, false);
      }
      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  },
);

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeader('authorization'),
  secretOrKey: constants.JWT_SECRET,
};

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await User.findById(payload._id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(e, false);
  }
});

passport.use(localStategy);
passport.use(jwtStrategy);

export const authLogin = passport.authenticate('local', { session: false });
export const authJwt = passport.authenticate('jwt', { session: false });
