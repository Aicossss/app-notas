const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const morgan = require("morgan");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

// Initialize
const app = express();
require("./config/passport");

//Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main", //el main.hbs de views/layouts
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs", //la extension que usaremos es .hbs
  })
);

app.set("view engine", ".hbs");

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    //por defecto van los valores de abajo
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize()); //passport necesita esto
app.use(passport.session());
app.use(flash());


//Global variables
app.use((req, res, next) => {
  //el next es para que continue despues de este use
  res.locals.succes_msg = req.flash("succes_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  //el locals.succes_msg es un nombre que uno pone a su criterio
  next();
});

//Routes
app.use(require("./routes/index.routes.js"));
app.use(require("./routes/notes.routes.js"));
app.use(require("./routes/users.routes.js"));

//Static files
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
