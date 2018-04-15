import Businesses from '../models/Businesses';
import SendResponse from '../SendResponse';

const BusinessController = {
    // Register business
    create: (req, res) => {
        // Assign user entries to variables
        const { businessName, category, state } = req.body;

        // Validation of user input
        if (!businessName || !category || !state) {
            // Send a validation failure response
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
    }
};

export default BusinessController;
