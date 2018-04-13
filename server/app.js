import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;

app.use(bodyParser.json());
app.use(logger('combined'));

app.get('*', (req, res) => {
    res.send('Right here!');
});

app.listen(port);
