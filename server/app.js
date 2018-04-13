import express from 'express';
import logger from 'morgan';

const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;

app.use(logger('combined'));

app.listen(port, () => {
    console.log('We are live!');
});
