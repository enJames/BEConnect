import models from '../models/index';
import UtilityFunctions from '../UtilityFunctions';

const { enbusinesses, enbusinessreviews } = models;
const { SendResponse, RetrieveReviews } = UtilityFunctions;

const ReviewsController = {
    create: (req, res) => {
        // Assign values
        const { reveiwer, review } = req.body;
        const { businessId } = req.params;

        // User input validation
        if (!reveiwer || !review) {
            return SendResponse(res, 400, 'Fill out all fields');
        }

        // Define values to persist
        const dataToPersist = {
            reveiwer,
            review,
            businessidentifier: businessId
        };

        // Persist successful validation data to database
        enbusinesses
            .findById(parseInt(businessId, 10))
            .then((business) => {
                if (business) {
                    enbusinessreviews
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
            enbusinessreviews,
            SendResponse,
            businessId
        );
    },
    getReview: (req, res) => {
        const { businessId, reviewId } = req.params;

        return RetrieveReviews(
            res,
            enbusinesses,
            enbusinessreviews,
            SendResponse,
            businessId,
            reviewId
        );
    }
};

export default ReviewsController;
