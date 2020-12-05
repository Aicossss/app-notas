const passport = require("passport");
const localstrategy = require("passport-local").Strategy;
const user = require("../models/user");

passport.use(
    new localstrategy({
            //le damos de nombre login a la strategy
            usernameField: "email",
        },
        async (email, password, done) => {
            //Confirmando email
            //const usuarioxde=await user.findOne({email});
            const usuario = await user.findOne({
                email
            });
            if (!usuario) {
                //done(error, usuario, opciones extra)
                return done(null, false, {
                    message: "No se encontró al usuario"
                });
            } else {
                //validando contraseña
                console.log(usuario);
                const match = await usuario.matchPassword(password);

                if (match) {
                    return done(null, usuario);
                } else {
                    return done(null, false, {
                        message: "Contraseña incorrecta"
                    });
                }
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id); //error, id del usuario
    console.log(user.id);
});

passport.deserializeUser((id, done) => { //valor que recibi de serialize
    console.log("id:" + id);
    user.findById(id, (err, user) => {
        done(err, user);
    });
});