const { Strategy, ExtractJwt } = require('passport-jwt');
const { Users, Token } = require('../../models/index');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const auth = (passport) => {
  passport.use(
    'jwt',
    new Strategy(opts, async (JWT_PAYLOAD, done) => {
      const user = await Users.findByPk(JWT_PAYLOAD.sub);
      return user ? done(null, user) : done(null, false);
    }),
  );
  passport.use(
    'refreshToken',
    new Strategy(opts, async (JWT_PAYLOAD, done) => {
      const token = await Token.findOne({
        where: { tokenKey: String(JWT_PAYLOAD.tokenKey) },
      });
      return token ? done(null, token) : done(null, false);
    }),
  );
};

module.exports = auth;
