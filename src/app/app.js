import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import express from 'express';
import session from 'express-session';
import csrf from 'csurf';
import flash from 'connect-flash';
import passport from 'passport';
const app = express();
import { create } from 'express-handlebars';
import { userVerification, isAdminVerification } from './middlewares/userVerification.js';
import authRoutes from './routes/auth.routes.js';
import workersRoutes from './routes/workers.routes.js';
import homeRoutes from './routes/home.routes.js';
import usersRoutes from './routes/users.routes.js';
import requestsRoutes from './routes/requests.routes.js';
import User_Model from './models/User_Model.js';

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    name: 'secret-name-session',
  }),
);
app.use(flash());

app.get("/mensaje-flash", (req, res) => {
  res.json(req.flash("mensaje"));
});

app.get("/campos-validados", (req, res) => {
  req.flash("mensaje", "todos los campos fueron validados");
  res.redirect("/mensaje-flash");
});

app.get("/ruta-protegida", (req, res) => {
  res.json(req.session.user || "sin sessión de usuario");
});

app.get("/crear-session", (req, res) => {
  req.session.user = "bluuweb";
  res.redirect("/ruta-protegida");
});

app.get("/destruir-session", (req, res) => {
  req.session.destroy();
  res.redirect("/ruta-protegida");
});

// //passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) =>
  done(null, { id: user.id, email: user.email, role: user.role, name: user.name }),
);
passport.deserializeUser(async (user, done) => {
  const userDB = await User_Model.findByPk(user.id);
  return done(null, { id: userDB.id, email: userDB.email, role: userDB.role, name: userDB.name });
});

// ------view engine
const hbs = create({
  extname: 'hbs',
  partialsDir: [`${__dirname}/../public/views/components`],
  helpers: {
    toJson: function (obj) {
      return JSON.stringify({ data: obj });
    },
    ifEquals: function (arg1, arg2, options) {
      console.log(arg1);
      console.log(arg2);
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    },
  }
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', `${__dirname}/../public/views`);
// -----/view engine

//middlewares
app.use(express.static(__dirname.replace('app', 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(csrf());
// app.use((req, res, next) => {
//   res.locals.csrfToken = req.csrfToken();
//   res.locals.messages = req.flash('messages');
//   next();
// });

//router
app.use('/auth', authRoutes);
app.use('/', userVerification, homeRoutes);
app.use('/users', [userVerification, isAdminVerification], usersRoutes);
app.use('/requests', userVerification, requestsRoutes);
app.use('/workers', userVerification, workersRoutes);

//? Sync database changes
// import './database/db.js'

export default app;