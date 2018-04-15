import Models from '../models/Models';
import SendResponse from '../SendResponse';

const { Reviews } = Models;

const ReviewsController = {
    create: (req, res) => {
        // Assign values
        const { reviewer, review } = req.body;
        const { businessId } = req.params;
        const theBusinessReviews = [];

        if (!reviewer || !review) {
            return SendResponse(res, 400, 'Fill out all fields');
        }

        // Define values to persist
        const dataToPersist = {
            reviewId: (Reviews.length + 1),
            businessId: parseInt(businessId, 10),
            reviewer,
            review
        };

        Reviews.push(dataToPersist);
        console.log(Reviews);

        Reviews.forEach((eachReview) => {
            if (eachReview.businessId === parseInt(businessId, 10)) {
                theBusinessReviews.push(eachReview);
            }
        });

        if (!theBusinessReviews) {
            return SendResponse(res, 404, 'There are no reviews for this business');
        }
        return SendResponse(res, 201, 'Review posted!', theBusinessReviews);
    }
};

export default ReviewsController;
