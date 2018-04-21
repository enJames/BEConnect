import Models from '../models/Models';
import SendResponse from '../SendResponse';

const { Users } = Models;

const UsersController = {
    create: (req, res) => {
        const { username, email, password } = req.body;
        let exists;

        if (!username || !email || !password) {
            return SendResponse(res, 400, 'Fill out all fields');
        }

        Users.forEach((user) => {
            if ((user.username === username) || (user.email === email)) {
                exists = true;
            }
        });

        if (exists) {
            return SendResponse(res, 409, 'User details already exists');
        }

        const dataToPersist = {
            userId: (Users.length + 1),
            username,
            email,
            password
        };

        Users.push(dataToPersist);

        return SendResponse(res, 201, 'Your account has been created');
    },
    login: (req, res) => {
        const { email, password } = req.body;
        let exists;

        if (!email || !password) {
            return SendResponse(res, 400, 'Fill out all fields');
        }

        Users.forEach((user) => {
            if ((user.email === email) && (user.password === password)) {
                exists = true;
            }
        });

        if (!exists) {
            return SendResponse(res, 401, 'Credentials do not match');
        }
        return SendResponse(res, 200, `Welcome ${email}`);
    },
    remove: (req, res) => {
        const { userId } = req.params;
        let exists;

        Users.forEach((user, index) => {
            if (user.userId === parseInt(userId, 10)) {
                Users.splice(index, 1);
                exists = true;
            }
        });

        if (!exists) {
            return SendResponse(res, 404, 'There was an error');
        }
        return SendResponse(res, 200, 'Account deleted');
    }
};

export default UsersController;
