import Businesses from '../models/Businesses';
import SendResponse from '../SendResponse';

const BusinessController = {
    create: (req, res) => {
        const { businessName, category, state } = req.body;

        if (!businessName || !category || !state) {
            return SendResponse(res, 400, 'Fill out all fields');
        }
        const dataToPersist = {
            id: (Businesses.length + 1),
            businessName,
            category,
            state
        };

        Businesses.push(dataToPersist);

        return SendResponse(res, 201, 'Registration successful!', Businesses);
    }
};

export default BusinessController;
