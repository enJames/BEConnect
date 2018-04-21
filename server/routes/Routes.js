import express from 'express';
import BusinessController from '../controllers/BusinessController';
import ReviewsController from '../controllers/ReviewsController';
import UsersController from '../controllers/UsersController';

const BusinessesRoutes = express.Router();
const UsersRoutes = express.Router();

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
// Sign up route
UsersRoutes.post('/signup', UsersController.create);
// Login route
UsersRoutes.post('/login', UsersController.login);
// Delete Account route
UsersRoutes.delete('/user/:userId', UsersController.remove);

const Routes = {
    BusinessesRoutes,
    UsersRoutes
};

export default Routes;
