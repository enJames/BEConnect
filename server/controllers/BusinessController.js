import models from '../models/index';
import UtilityFunctions from '../UtilityFunctions';

const { enbusinesses } = models;
const { SendResponse, LocationFilter } = UtilityFunctions;

const BusinessController = {
    // Register a business
    create: (req, res) => {
        const {
            businessName,
            category,
            mantra,
            email,
            website,
            phone,
            addressOne,
            addressTwo,
            city,
            state,
            country,
            userIdentifier
        } = req.body;

        // Data to persist to database
        const dataToPersist = {
            businessName,
            category,
            mantra,
            email,
            website,
            phone,
            addressOne,
            addressTwo,
            city,
            state,
            country,
            userIdentifier
        };

        // Persist successful validation data to database
        enbusinesses
            .findOrCreate({ where: { businessName }, defaults: dataToPersist })
            .spread((business, created) => {
                // Send a response after data persistence to database
                if (!created) {
                    return SendResponse(res, 409, 'Business name already exists');
                }
                return SendResponse(res, 201, `${businessName} has been registered successfully`, business);
            })
            .catch(error => SendResponse(res, 500, 'There was a problem', error));
    },
    // Update business
    update: (req, res) => {
        const { businessId } = req.params;
        const {
            businessName,
            category,
            mantra,
            email,
            website,
            phone,
            addressOne,
            addressTwo,
            city,
            state,
            country
        } = req.body;

        // data to update
        const dataToUpdate = {
            businessName,
            category,
            mantra,
            email,
            website,
            phone,
            addressOne,
            addressTwo,
            city,
            state,
            country
        };

        // Find business then update
        enbusinesses
            .findById(businessId)
            .then((business) => {
                if (!business) {
                    return SendResponse(res, 404, 'Business not found');
                }
                enbusinesses
                    .update(dataToUpdate, { where: { id: businessId } })
                    .then(() => SendResponse(res, 200, 'Business updated successfully'))
                    .catch(error => SendResponse(res, 500, 'There was a problem u', error));
            })
            .catch(error => SendResponse(res, 500, 'There was a problem', error));
    },
    // Remove a business
    remove: (req, res) => {
        const { businessId } = req.params;

        enbusinesses
            .destroy({ where: { id: businessId } })
            .then((deleted) => {
                if (deleted === 0) {
                    return SendResponse(res, 404, 'Business not found');
                }
                return SendResponse(res, 200, 'Business deleted successfully');
            })
            .catch(error => SendResponse(res, 500, 'There was a problem', error));
    },
    // Get a business
    getBusiness: (req, res) => {
        const { businessId } = req.params;

        enbusinesses
            .findById(parseInt(businessId, 10))
            .then((user) => {
                if (!user) {
                    return SendResponse(res, 404, 'Business not found');
                }
                return SendResponse(res, 200, 'Business found', user.dataValues);
            })
            .catch(() => SendResponse(res, 500, 'There was a problem'));
    },
    // Get all businesses
    getBusinesses: (req, res) => {
        // checks if a query is passed
        if (Object.keys(req.query).length !== 0) {
            const { location, category } = req.query;
            const searchOptions = {};

            // if either location or category is set add as searchOptions property.
            // Otherwise leave empty
            if (location) {
                searchOptions.state = location;
                LocationFilter(res, enbusinesses, searchOptions, SendResponse, location);
            } else if (category) {
                searchOptions.category = category;
                LocationFilter(res, enbusinesses, searchOptions, SendResponse, category);
            } else {
                LocationFilter(res, enbusinesses, searchOptions, SendResponse, category);
            }
        } else {
            enbusinesses
                .findAll()
                .then((businesses) => {
                    const allBusinesses = [];

                    businesses.forEach(eachBusiness =>
                        allBusinesses.push(eachBusiness.dataValues));

                    const message = `Found ${allBusinesses.length} businesses`;
                    return SendResponse(res, 200, message, allBusinesses);
                });
        }
    }
};

export default BusinessController;
