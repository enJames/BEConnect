import models from '../models/index';
import UtilityFunctions from '../UtilityFunctions';

const { enbusinesses } = models;
const { SendResponse, LocationFilter } = UtilityFunctions;

const BusinessController = {
    // Register a business
    create: (req, res) => {
        const {
            businessname,
            category,
            state,
            useridentifier
        } = req.body;

        // Validation of user input
        if (!businessname || !category || !state) {
            return SendResponse(res, 400, 'Fill out all fields');
        }
        const dataToPersist = {
            businessname,
            category,
            state,
            useridentifier
        };

        // Persist successful validation data to database
        enbusinesses
            .findOrCreate({ where: { businessname }, defaults: dataToPersist })
            .spread((business, created) => {
                // Send a response after data persistence to database
                if (!created) {
                    return SendResponse(res, 409, 'Business name already exists');
                }
                return SendResponse(res, 201, `${businessname} registered successfully`, business);
            })
            .catch(error => SendResponse(res, 500, 'There was a problem', error));
    },
    // Update business
    update: (req, res) => {
        const { businessId } = req.params;
        const {
            businessname,
            category,
            state
        } = req.body;

        // Validation of user input
        if (!businessname || !category || !state) {
            return SendResponse(res, 400, 'Fill out all fields');
        }
        const dataToPersist = {
            businessname,
            category,
            state
        };

        enbusinesses
            .update(dataToPersist, { where: { id: businessId } })
            .then(() => SendResponse(res, 200, 'Business updated successfully'))
            .catch(error => SendResponse(res, 500, 'There was a problem', error));
    },
    // Remove a business
    remove: (req, res) => {
        const { businessId } = req.params;

        enbusinesses
            .destroy({ where: { id: businessId } })
            .then((deleted) => {
                if (deleted === 0) {
                    return SendResponse(res, 404, 'Business does not exist');
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
                    return SendResponse(res, 404, 'Business not found!');
                }
                return SendResponse(res, 200, 'Business found!', user.dataValues);
            })
            .catch(() => SendResponse(res, 500, 'There was a problem'));
    },
    // Get all businesses
    getBusinesses: (req, res) => {
        if (Object.keys(req.query).length !== 0) {
            const { location, category } = req.query;
            const searchOptions = {};

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
                })
                .catch(error => SendResponse(res, 500, 'There was an error', error));
        }
    }
};

export default BusinessController;
