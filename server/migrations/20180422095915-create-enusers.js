module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('enusers', {
        userid: {
            allowNull: false,
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true
        },
        email: {
            allowNull: false,
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    }),
    down: queryInterface => queryInterface.dropTable('enusers')
};
