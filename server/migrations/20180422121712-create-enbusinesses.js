module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('enbusinesses', {
        id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        businessName: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true
        },
        category: {
            allowNull: false,
            type: Sequelize.STRING
        },
        mantra: {
            allowNull: false,
            type: Sequelize.STRING
        },
        email: {
            allowNull: false,
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        website: {
            allowNull: false,
            type: Sequelize.STRING
        },
        phone: {
            allowNull: false,
            type: Sequelize.STRING
        },
        addressOne: {
            allowNull: false,
            type: Sequelize.STRING
        },
        addressTwo: {
            allowNull: false,
            type: Sequelize.STRING
        },
        city: {
            allowNull: false,
            type: Sequelize.STRING
        },
        state: {
            allowNull: false,
            type: Sequelize.STRING
        },
        country: {
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
        },
        userIdentifier: {
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            references: {
                model: 'enusers',
                key: 'id',
                as: 'userIdentifier'
            }
        }
    }),
    down: queryInterface => queryInterface.dropTable('enbusinesses')
};
