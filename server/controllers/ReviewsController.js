import Models from '../models/Models';
import SendResponse from '../SendResponse';

const { Reviews } = Models;

const ReviewsController = {
    create: (req, res) => {
        // Assign values
        const { reviewer, review } = req.body;
        const { businessId } = req.params;
        const theBusinessReviews = [];
        let posted;

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

        Reviews.forEach((eachReview) => {
            if (eachReview.businessId === parseInt(businessId, 10)) {
                Reviews.push(dataToPersist);
                theBusinessReviews.push(eachReview);
                posted = true;
            }
        });
        if (!posted) {
            return SendResponse(res, 404, 'Business does not exist');
        }
        return SendResponse(res, 201, 'Review posted!', theBusinessReviews);
    },
    // Get all reviews of a business
    getReviews: (req, res) => {
        const { businessId } = req.params;
        const theBusinessReviews = [];
        let posted;

        Reviews.forEach((eachReview) => {
            if (eachReview.businessId === parseInt(businessId, 10)) {
                theBusinessReviews.push(eachReview);
                posted = true;
            }
        });
        if (!posted) {
            return SendResponse(res, 404, 'Business does not exist');
        }
        return SendResponse(
            res,
            200,
            `Found ${theBusinessReviews.length} reviews for this business!`,
            theBusinessReviews
        );
    }
};

export default ReviewsController;
