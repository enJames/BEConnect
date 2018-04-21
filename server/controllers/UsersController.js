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
    }
};

export default UsersController;
