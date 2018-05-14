const UsersModel = (sequelize, DataTypes) => {
    const UsersTable = sequelize.define('enusers', {
        username: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        },
        firstname: {
            allowNull: false,
            type: DataTypes.STRING
        },
        lastname: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING
        }
    }, { freezeTableName: true });
    UsersTable.associate = (models) => {
        UsersTable.hasMany(models.enbusinesses, {
            foreignKey: 'userIdentifier',
            as: 'regBusinesses'
        });
    };

    return UsersTable;
};

export default UsersModel;
