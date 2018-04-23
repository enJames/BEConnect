module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('enbusinessreviews', {
        reviewid: {
            allowNull: false,
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        reveiwer: {
            allowNull: false,
            type: Sequelize.STRING
        },
        review: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        businessidentifier: {
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            references: {
                model: 'enbusinesses',
                key: 'businessid',
                as: 'businessidentifier'
            }
        }
    }),
    down: queryInterface => queryInterface.dropTable('enbusinessreviews')
};