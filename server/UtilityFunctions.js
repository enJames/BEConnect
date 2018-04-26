const UtilityFunctions = {
    SendResponse: (res, statusCode, message, responseObject) => {
        if (!responseObject) {
            return res.status(statusCode).json({
                message
            });
        }
        return res.status(statusCode).json({
            message,
            responseObject
        });
    },
    LocationFilter: (res, model, searchOptions, ResponseFunction, filterQuery) => {
        if (Object.keys(searchOptions).length === 0) {
            return ResponseFunction(res, 403, 'Unknown search query');
        }
        model
            .findAll({ where: searchOptions })
            .then((businesses) => {
                if (businesses.length === 0) {
                    const message = `There are currently no businesses in ${filterQuery}`;
                    return ResponseFunction(res, 404, message);
                }
                const allBusinesses = [];

                businesses.forEach(eachBusiness =>
                    allBusinesses.push(eachBusiness.dataValues));

                const message = `Found ${allBusinesses.length} businesses in ${filterQuery}`;
                return ResponseFunction(res, 200, message, allBusinesses);
            })
            .catch(error => ResponseFunction(res, 500, 'There was an error', error));
    },
    RetrieveReviews: (res, model, AsscModel, ResponseFunction, businessId, reviewId) => {
        model
            .findOne({
                where: {
                    id: businessId
                },
                include: [{
                    model: AsscModel,
                    as: 'businessreviews'
                }]
            })
            .then((business) => {
                const { businessreviews } = business;

                if (reviewId) {
                    for (let i = 0; i < businessreviews.length; i += 1) {
                        if (businessreviews[i].id === parseInt(reviewId, 10)) {
                            return ResponseFunction(res, 200, 'Review', businessreviews[i]);
                        }
                    }
                    return ResponseFunction(res, 404, 'Review not found');
                } else if (!business) {
                    return ResponseFunction(res, 404, 'Business does not exist');
                }
                return ResponseFunction(res, 200, 'All reviews', businessreviews);
            })
            .catch(error => ResponseFunction(res, 500, 'There was a problem', error));
    }
};

export default UtilityFunctions;
