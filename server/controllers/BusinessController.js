import Models from '../models/Models';
import SendResponse from '../SendResponse';

const { Businesses } = Models;

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
            if (business.businessId === parseInt(req.params.businessId, 10)) {
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
            if (business.businessId === parseInt(req.params.businessId, 10)) {
                Businesses.splice(index, 1);

                removedBusiness = business;
            }
        });
        if (!removedBusiness) {
            return SendResponse(res, 404, 'Business not found!');
        }
        return SendResponse(res, 202, 'Business deleted!', Businesses);
    },
    // Get a business
    getBusiness: (req, res) => {
        let theBusiness;

        Businesses.forEach((business) => {
            if (business.businessId === parseInt(req.params.businessId, 10)) {
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
        if (Object.keys(req.query).length !== 0) {
            const { location, category } = req.query;
            const theBusinesses = [];

            let theQuery;

            if (location) {
                theQuery = location;
                Businesses.forEach((business) => {
                    if (business.state === theQuery) {
                        theBusinesses.push(business);
                    }
                });
            } else if (category) {
                theQuery = category;
                Businesses.forEach((business) => {
                    if (business.category === theQuery) {
                        theBusinesses.push(business);
                    }
                });
            }
            if (theBusinesses.length === 0) {
                return SendResponse(res, 404, `There are currently no businesses in ${theQuery}`);
            }
            return SendResponse(res, 200, `Found ${theBusinesses.length} businesses`, theBusinesses);
        }
        const message = `Found ${Businesses.length} businesses`;
        return SendResponse(res, 200, message, Businesses);
    }
};

export default BusinessController;
