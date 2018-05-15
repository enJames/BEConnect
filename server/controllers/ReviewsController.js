import models from '../models/index';
import UtilityFunctions from '../UtilityFunctions';

const { enbusinesses, enreviews } = models;
const { SendResponse, RetrieveReviews } = UtilityFunctions;

const ReviewsController = {
    create: (req, res) => {
        // Assign values
        const {
            firstname,
            lastname,
            email,
            company,
            position,
            review
        } = req.body;
        const { businessId } = req.params;

        // Define values to persist
        const dataToPersist = {
            firstname,
            lastname,
            email,
            company,
            position,
            review,
            businessIdentifier: businessId
        };

        // Persist successful validation data to database
        enbusinesses
            .findById(parseInt(businessId, 10))
            .then((business) => {
                if (business) {
                    enreviews
                        .create(dataToPersist)
                        .then(reviews => SendResponse(res, 201, 'Review posted', reviews))
                        .catch(error => SendResponse(res, 500, 'There was an error', error.errors));
                } else {
                    return SendResponse(res, 404, 'Business not found');
                }
            })
            .catch(error => SendResponse(res, 500, 'There was an error', error));
    },
    getReviews: (req, res) => {
        const { businessId } = req.params;

        return RetrieveReviews(
            res,
            enbusinesses,
            enreviews,
            SendResponse,
            businessId
        );
    },
    getReview: (req, res) => {
        const { businessId, reviewId } = req.params;

        return RetrieveReviews(
            res,
            enbusinesses,
            enreviews,
            SendResponse,
            businessId,
            reviewId
        );
    }
};

export default ReviewsController;
