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
            });
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
                if (business) {
                    const { businessreviews } = business;

                    // If a review ID is passed in the url
                    if (reviewId) {
                        const theReview = [];

                        for (let i = 0; i < businessreviews.length; i += 1) {
                            if (businessreviews[i].id === parseInt(reviewId, 10)) {
                                theReview.push(businessreviews[i]);
                                break;
                            }
                        }
                        if (theReview.length > 0) {
                            return ResponseFunction(res, 200, 'Review', theReview);
                        }
                        return ResponseFunction(res, 404, 'Review not found');
                    }
                    return ResponseFunction(res, 200, 'All reviews', businessreviews);
                }
                return ResponseFunction(res, 404, 'Business not found');
            });
    }
};

export default UtilityFunctions;
