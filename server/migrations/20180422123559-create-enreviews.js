module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('enreviews', {
        id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            allowNull: false,
            type: Sequelize.STRING
        },
        lastname: {
            allowNull: false,
            type: Sequelize.STRING
        },
        email: {
            allowNull: true,
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        company: {
            allowNull: true,
            type: Sequelize.STRING
        },
        position: {
            allowNull: true,
            type: Sequelize.STRING
        },
        review: {
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
        businessIdentifier: {
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            references: {
                model: 'enbusinesses',
                key: 'id',
                as: 'businessIdentifier'
            }
        }
    }),
    down: queryInterface => queryInterface.dropTable('enbusinessreviews')
};
