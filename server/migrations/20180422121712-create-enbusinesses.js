module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('enbusinesses', {
        id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        businessname: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true
        },
        category: {
            allowNull: false,
            type: Sequelize.STRING
        },
        state: {
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
        useridentifier: {
            type: Sequelize.INTEGER,
            onDelete: 'CASCADE',
            references: {
                model: 'enusers',
                key: 'id',
                as: 'useridentifier'
            }
        }
    }),
    down: queryInterface => queryInterface.dropTable('enbusinesses')
};
