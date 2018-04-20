import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerTools from 'swagger-tools';
import YAML from 'yamljs';
import Routes from './routes/Routes';

const app = express();
const urlencoded = bodyParser.urlencoded({ extended: false });
const swaggerDoc = YAML.load('swagger.yaml');
const port = parseInt(process.env.PORT, 10) || 8000;

swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());
});

app.use(bodyParser.json()); // parses application/json
app.use(urlencoded); // parses application/x-www.form-urlencoded
app.use(logger('combined'));
app.use('/api/v1/businesses', Routes.BusinessesRoutes);
app.use('/api/v1/businesses/:businessId/reviews', Routes.ReviewsRoutes);

app.listen(port);

export default app;
