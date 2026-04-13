import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import { cookieExtractor } from "../utils.js";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import UsersDAO from "../models/dao/UsersDAOMongo.js";
import { verifyPassword } from "../utils.js";
import { UsersDTO } from "../models/dto/UsersDTO.js";
import { env } from "./env.js";
import { welcome } from "./mailing.js";

// -------------OBJETOS DE CONFIGURACION------------------
// -------------------------------------------------------
export const authenticateConfig = {
    failureRedirect: "/login-failed",
    successRedirect: "/profile"
}

const localConfig = {
    passReqToCallback: true,
    usernameField: "email",
    passwordField: "password",
    session: true
}

const githubConfig = {
    clientID: env.GITHUB_CLIENT,
    clientSecret: env.GITHUB_SECRET,
    callbackURL: env.GITHUB_CALLBACKURL
}

const jwtConfig = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: env.JWT_SECRET
}

// ----------------------------CALLBACKS------------------
// -------------------------------------------------------

// EN LAS FUNCIONES DE LAS ESTRATEGIAS VERAN QUE USAMOS EL DAO EN LUGAR DEL 
// SERVICE
// ESTO SE DEBE A QUE, EN REALIDAD, ESTAS FUCNIONES SON EL SERVICIO EN SI
// MISMO
async function githubCall(accessToken, refreshToken, profile, done) {
    const { _json } = profile;
    const user = await UsersDAO.findByEmail(profile._json.id);
    if (!user) {
        const newUser = await UsersDAO.create({
            first_name: _json.login,
            email: _json.id,
            password: "1"
        })
        return done(null, newUser.toJSON());
    } else {
        return done(null, user);
    }
}

// REVISAR ANTES DE PUSHEAR
async function registerCall(req, email, password, done) {
    try {
        const user = req.body;
        const userExists = await UsersDAO.findByEmail(email);
        if (userExists) {
            console.log("ya existe una cuenta para ese mail");
            return done(null, false);
        }
        const newUser = await UsersDAO.create(new UsersDTO().saveUser(user));

        console.log(newUser);
        if (newUser) {
            await welcome(newUser.email);
        } else {
            return done(new Error("no se pudo crear el usuario"), false);
        }
        return done(null, newUser);
    } catch (error) {
        return done(error.message);
    }
}

async function loginCall(email, password, done) {
    try {
        const user = await UsersDAO.findByEmail(email);
        if (!user) {
            return done(null, false);
        }
        if (verifyPassword(password, user.password)) {

            return done(null, user);
        } else {
            return done(new Error("las credenciales no coinciden"), false);
        }
    } catch (error) {
        return done(error.message);
    }
}

function jwtCall(payload, done) {
    try {
        return done(null, payload);
    } catch (error) {
        return done(error);
    }
}

function initializePassport() {

    passport.use("register", new LocalStrategy(localConfig, registerCall));

    passport.use("login", new LocalStrategy(localConfig, loginCall));

    passport.use("github", new GitHubStrategy(githubConfig, githubCall));

    passport.use("jwt", new JWTStrategy(jwtConfig, jwtCall));

    passport.serializeUser((user, done) => {
        return done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        const user = await UsersDAO.findById(id);
        return done(null, user);
    });
}

export default initializePassport;