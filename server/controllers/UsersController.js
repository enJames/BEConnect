import models from '../models/index';
import UtilityFunctions from '../UtilityFunctions';

const { enusers } = models;
const { SendResponse } = UtilityFunctions;

const UsersController = {
    create: (req, res) => {
        const {
            username,
            firstname,
            lastname,
            email,
            password
        } = req.body;

        // Define values to persist
        const dataToPersist = {
            username,
            firstname,
            lastname,
            email,
            password
        };

        // Persist successful validation data to database
        enusers
            .findOrCreate({ where: { email }, defaults: dataToPersist })
            .spread((user, created) => {
                if (!created) {
                    return SendResponse(res, 409, 'Email already exists');
                }
                return SendResponse(res, 201, 'Sign up successful');
            })
            .catch(error => SendResponse(res, 500, 'There was an error', error));
    },
    login: (req, res) => {
        const { email, password } = req.body;

        enusers
            .findOne({ where: { email, password } })
            .then((user) => {
                if (!user) {
                    return SendResponse(res, 401, 'Credentials do not match');
                }
                return SendResponse(res, 200, `Welcome ${user.dataValues.username}`);
            });
    },
    remove: (req, res) => {
        const { username } = req.params;

        enusers
            .destroy({ where: { username } })
            .then((deleted) => {
                if (deleted === 0) {
                    return SendResponse(res, 404, `${username} does not exist`);
                }
                return SendResponse(res, 200, `${username} has been deleted`);
            });
    }
};

export default UsersController;
