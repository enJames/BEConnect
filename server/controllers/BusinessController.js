import Businesses from '../models/Businesses';
import SendResponse from '../SendResponse';

const BusinessController = {
    // Register business
    create: (req, res) => {
        const { businessName, category, state } = req.body;

        // Validation of user input
        if (!businessName || !category || !state) {
            return SendResponse(res, 400, 'Fill out all fields');
        }
        const dataToPersist = {
            id: (Businesses.length + 1),
            businessName,
            category,
            state
        };

        // Persist successful validation data to database
        Businesses.push(dataToPersist);

        // Send a response after data persistence to database
        return SendResponse(res, 201, 'Registration successful!', Businesses);
    },
    // Update business
    update: (req, res) => {
        let updatedBusiness;

        Businesses.forEach((business) => {
            if (business.id === parseInt(req.params.businessId, 10)) {
                business = { ...business, ...req.body };

                updatedBusiness = business;
            }
        });
        if (!updatedBusiness) {
            return SendResponse(res, 404, 'Business not found!');
        }
        return SendResponse(res, 200, 'Business updated!', updatedBusiness);
    },
    // Remove a business
    remove: (req, res) => {
        let removedBusiness;

        Businesses.forEach((business, index) => {
            if (business.id === parseInt(req.params.businessId, 10)) {
                Businesses.splice(index, 1);

                removedBusiness = business;
            }
        });
        if (!removedBusiness) {
            return SendResponse(res, 404, 'Business not found!');
        }
        return SendResponse(res, 202, 'Business deleted!', Businesses);
    }
};

export default BusinessController;
