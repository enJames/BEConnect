import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import Routes from './routes/Routes';

const app = express();
const urlencoded = bodyParser.urlencoded({ extended: false });
const port = parseInt(process.env.PORT, 10) || 8000;

app.use(bodyParser.json()); // parses application/json
app.use(urlencoded); // parses application/x-www.form-urlencoded
app.use(logger('combined'));

Routes(app);

app.listen(port);

export default app;
