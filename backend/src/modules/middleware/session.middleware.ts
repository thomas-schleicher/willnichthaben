import session from 'express-session';

export const sessionMiddleware = session({
    secret: "test",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, //todo: change this for https (prod)
        sameSite: "lax",
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
    },
});