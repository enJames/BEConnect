import BusinessController from '../controllers/BusinessController';

const Routes = {
    business: (app) => {
        app.post('/api/v1/businesses', BusinessController.create);
        app.put('/api/v1/businesses/:businessId', BusinessController.update);
        app.delete('/api/v1/businesses/:businessId', BusinessController.remove);
        app.get('/api/v1/businesses/:businessId', BusinessController.getBusiness);
        app.get('/api/v1/businesses', BusinessController.getBusinesses);
    }
};

export default Routes;
