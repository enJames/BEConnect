const BusinessesModel = (sequelize, DataTypes) => {
    const BusinessesTable = sequelize.define('enbusinesses', {
        businessname: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        category: {
            allowNull: false,
            type: DataTypes.STRING
        },
        state: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, { freezeTableName: true });
    BusinessesTable.associate = (models) => {
        BusinessesTable.belongsTo(models.enusers, {
            foreignKey: 'useridentifier',
            onDelete: 'CASCADE'
        });
        BusinessesTable.hasMany(models.enbusinessreviews, {
            foreignKey: 'businessidentifier',
            as: 'businessreviews'
        });
    };

    return BusinessesTable;
};

export default BusinessesModel;
