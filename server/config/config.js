import { config } from 'dotenv';

config();

const configJson = {
    development: {
        username: 'king',
        password: 'pass',
        database: 'beconnect',
        host: '127.0.0.1',
        port: 5432,
        dialect: 'postgres'
    },
    production: {
        use_env_variable: 'DATABASE_URL'
    }
};

export default configJson;
