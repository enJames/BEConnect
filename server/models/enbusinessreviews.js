const BusinessReviewsModel = (sequelize, DataTypes) => {
    const BusinessReviewsTable = sequelize.define('enbusinessreviews', {
        reveiwer: {
            allowNull: false,
            type: DataTypes.STRING
        },
        review: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        }
    }, { freezeTableName: true });
    BusinessReviewsTable.associate = (models) => {
        BusinessReviewsTable.belongsTo(models.enbusinesses, {
            foreignKey: 'businessidentifier',
            onDelete: 'CASCADE'
        });
    };

    return BusinessReviewsTable;
};

export default BusinessReviewsModel;
