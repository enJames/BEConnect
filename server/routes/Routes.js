import express from 'express';
import BusinessController from '../controllers/BusinessController';
import ReviewsController from '../controllers/ReviewsController';
import UsersController from '../controllers/UsersController';

const BusinessesRoutes = express.Router();
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

// Business Reviews Routes
BusinessesRoutes.post('/:businessId/reviews', ReviewsController.create);
BusinessesRoutes.get('/:businessId/reviews', ReviewsController.getReviews);
BusinessesRoutes.get('/:businessId/reviews/:reviewId', ReviewsController.getReview);

// User Routes
UsersRoutes.post('/signup', UsersController.create);

const Routes = {
    BusinessesRoutes,
    UsersRoutes
};

export default Routes;
