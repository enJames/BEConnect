import express from 'express';
import BusinessController from '../controllers/BusinessController';
import ReviewsController from '../controllers/ReviewsController';

const BusinessesRoutes = express.Router();
const ReviewsRoutes = express.Router();
const UsersRoutes = express.Router();

/*
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
    }
};
*/

// Business Routes
BusinessesRoutes.post('/', BusinessController.create);
BusinessesRoutes.put('/:businessId', BusinessController.update);
BusinessesRoutes.delete('/:businessId', BusinessController.remove);
BusinessesRoutes.get('/:businessId', BusinessController.getBusiness);
BusinessesRoutes.get('/', BusinessController.getBusinesses);

// Reviews Routes
ReviewsRoutes.post('/', ReviewsController.create);

const Routes = {
    BusinessesRoutes,
    ReviewsRoutes,
    UsersRoutes
};

export default Routes;
