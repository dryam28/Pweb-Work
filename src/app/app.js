import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import express from 'express';
import session from 'express-session';
import csrf from 'csurf';
import flash from 'connect-flash';
import passport from 'passport';
const app = express();
import authRoutes from './routes/auth.routes.js';
import workersRoutes from './routes/workers.routes.js';

// ------view engine
import { create } from 'express-handlebars';

const hbs = create({
  extname: 'hbs',
  partialsDir: [`${__dirname}/../public/views/components`],
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', `${__dirname}/../public/views`);
// -----/view engine

//middlewares
app.use(express.static(__dirname.replace('app', 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//router
app.use('/auth', authRoutes);
app.use('/', workersRoutes);

//? Sync database changes
// require('./database/db')

export default app;