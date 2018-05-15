const BusinessesModel = (sequelize, DataTypes) => {
    const BusinessesTable = sequelize.define('enbusinesses', {
        businessName: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        category: {
            allowNull: false,
            type: DataTypes.STRING
        },
        mantra: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING
        },
        website: {
            allowNull: false,
            type: DataTypes.STRING
        },
        phone: {
            allowNull: false,
            type: DataTypes.STRING
        },
        addressOne: {
            allowNull: false,
            type: DataTypes.STRING
        },
        addressTwo: {
            allowNull: false,
            type: DataTypes.STRING
        },
        city: {
            allowNull: false,
            type: DataTypes.STRING
        },
        state: {
            allowNull: false,
            type: DataTypes.STRING
        },
        country: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, { freezeTableName: true });
    BusinessesTable.associate = (models) => {
        BusinessesTable.belongsTo(models.enusers, {
            foreignKey: 'userIdentifier',
            onDelete: 'CASCADE'
        });
        BusinessesTable.hasMany(models.enreviews, {
            foreignKey: 'businessIdentifier',
            as: 'businessReviews'
        });
    };

    return BusinessesTable;
};

export default BusinessesModel;
