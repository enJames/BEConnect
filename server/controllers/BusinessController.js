import Models from '../models/Models';
import SendResponse from '../SendResponse';

const { businesses } = Models;

const BusinessController = {
    // BUSINESS ROUTES
    // Register a business
    create: (req, res) => {
        const { businessName, category, state } = req.body;

        // Validation of user input
        if (!businessName || !category || !state) {
            return SendResponse(res, 400, 'Fill out all fields');
        }
        const dataToPersist = {
            id: (businesses.length + 1),
            businessName,
            category,
            state
        };

        // Persist successful validation data to database
        businesses.push(dataToPersist);

        // Send a response after data persistence to database
        return SendResponse(res, 201, 'Registration successful!', businesses);
    },
    // Update business
    update: (req, res) => {
        let updatedBusiness;

        businesses.forEach((business) => {
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

        businesses.forEach((business, index) => {
            if (business.id === parseInt(req.params.businessId, 10)) {
                businesses.splice(index, 1);

                removedBusiness = business;
            }
        });
        if (!removedBusiness) {
            return SendResponse(res, 404, 'Business not found!');
        }
        return SendResponse(res, 202, 'Business deleted!', businesses);
    },
    // Get a business
    getBusiness: (req, res) => {
        let theBusiness;

        businesses.forEach((business) => {
            if (business.id === parseInt(req.params.businessId, 10)) {
                theBusiness = business;
            }
        });
        if (!theBusiness) {
            return SendResponse(res, 404, 'Business not found!');
        }
        return SendResponse(res, 200, 'Business found!', theBusiness);
    },
    // Get all businesses
    getBusinesses: (req, res) => {
        const message = `Found ${businesses.length} businesses`;
        return SendResponse(res, 200, message, businesses);
    }
};

export default BusinessController;
