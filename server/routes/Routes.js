import BusinessController from '../controllers/BusinessController';

const Routes = (app) => {
    app.post('/api/v1/businesses', BusinessController.create);
    app.put('/api/v1/businesses/:businessId', BusinessController.update);
};

export default Routes;
