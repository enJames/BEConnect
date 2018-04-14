import BusinessController from '../controllers/BusinessController';

const Routes = (app) => {
    app.post('/businesses', BusinessController.create);
};

export default Routes;
