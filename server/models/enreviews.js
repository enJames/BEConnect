const BusinessReviewsModel = (sequelize, DataTypes) => {
    const BusinessReviewsTable = sequelize.define('enreviews', {
        firstname: {
            allowNull: false,
            type: DataTypes.STRING
        },
        lastname: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            allowNull: true,
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        company: {
            allowNull: true,
            type: DataTypes.STRING
        },
        position: {
            allowNull: true,
            type: DataTypes.STRING
        },
        review: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, { freezeTableName: true });
    BusinessReviewsTable.associate = (models) => {
        BusinessReviewsTable.belongsTo(models.enbusinesses, {
            foreignKey: 'businessIdentifier',
            onDelete: 'CASCADE'
        });
    };

    return BusinessReviewsTable;
};

export default BusinessReviewsModel;
