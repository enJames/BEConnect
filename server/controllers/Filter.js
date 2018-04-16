import Models from '../models/Models';
import SendResponse from '../SendResponse';

const { Businesses } = Models;

const Filter = (req, res) => {
    const { location } = req.query;
    const theBusinesses = [];

    let theQuery;

    if (location) {
        theQuery = location;
    }

    Businesses.forEach((business) => {
        if (business.state === theQuery) {
            theBusinesses.push(business);
        }
    });
    if (theBusinesses.length === 0) {
        return SendResponse(res, 404, `There are currently no businesses in ${theQuery}`);
    }
    return SendResponse(res, 200, `Found ${theBusinesses.length} businesses`, theBusinesses);
};

export default Filter;
