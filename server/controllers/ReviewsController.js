import Models from '../models/Models';
import SendResponse from '../SendResponse';

const { Businesses, Reviews } = Models;

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

        Businesses.forEach((eachBusiness) => {
            if (eachBusiness.businessId === parseInt(businessId, 10)) {
                Reviews.push(dataToPersist);
                theBusinessReviews.push(eachBusiness);
                posted = true;
            }
        });
        if (!posted) {
            return SendResponse(res, 404, 'Business does not exist');
        }
        return SendResponse(res, 201, 'Review posted!', theBusinessReviews);
    },
    getReviews: (req, res) => {
        const { businessId } = req.params;

        const theBusinessReviews = [];
        let exists;

        Reviews.forEach((eachReview) => {
            if (eachReview.businessId === parseInt(businessId, 10)) {
                theBusinessReviews.push(eachReview);
            }
        });
        if (theBusinessReviews.length === 0) {
            // Check if business exists
            Businesses.forEach((eachBusiness) => {
                if (eachBusiness.businessId === parseInt(businessId, 10)) {
                    exists = true;
                }
            });
            if (!exists) {
                return SendResponse(res, 404, 'Business does not exist');
            }
        }
        return SendResponse(res, 200, `Found ${theBusinessReviews.length} reviews`, theBusinessReviews);
    },
    getReview: (req, res) => {
        const { businessId, reviewId } = req.params;

        const theBusinessReviews = [];
        let exists;

        Reviews.forEach((eachReview) => {
            if (
                (eachReview.businessId === parseInt(businessId, 10))
                &&
                eachReview.reviewId === parseInt(reviewId, 10)
            ) {
                theBusinessReviews.push(eachReview);
            }
        });
        if (theBusinessReviews.length === 0) {
            // Check if business exists
            Businesses.forEach((eachBusiness) => {
                if (eachBusiness.businessId === parseInt(businessId, 10)) {
                    exists = true;
                }
            });
            if (!exists) {
                return SendResponse(res, 404, 'Business does not exist');
            }
            return SendResponse(res, 404, 'There was an error.');
        }
        return SendResponse(res, 200, `Found ${theBusinessReviews.length} reviews`, theBusinessReviews);
    }
};

export default ReviewsController;
