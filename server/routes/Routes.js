import swaggerUi from 'swagger-ui-express';
import BusinessController from '../controllers/BusinessController';
import ReviewsController from '../controllers/ReviewsController';

const { serve, setup } = swaggerUi;
const swagger = require('../swagger.json');

const Routes = {
    businesses: (app) => {
        app.post('/api/v1/businesses', BusinessController.create);
        app.put('/api/v1/businesses/:businessId', BusinessController.update);
        app.delete('/api/v1/businesses/:businessId', BusinessController.remove);
        app.get('/api/v1/businesses/:businessId', BusinessController.getBusiness);
        app.get('/api/v1/businesses', BusinessController.getBusinesses);
    },
    reviews: (app) => {
        app.post('/api/v1/businesses/:businessId/reviews', ReviewsController.create);
    },
    documentation: (app) => {
        app.get('/api/v1/documentation', serve, setup(swagger));
    }
};

export default Routes;
