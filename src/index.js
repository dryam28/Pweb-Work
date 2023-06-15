// para poder usar variables de entorno 
import dotenv from 'dotenv';
dotenv.config();
import app from './app/app.js';
const port = process.env.PORT;

app.listen(port, () => console.log(`Example app listening on port ${port}!`)); 