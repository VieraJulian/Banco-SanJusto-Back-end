module.exports = (sequelize, DataTypes) => {
    let alias = "user"
    let cols = {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        }
    };
    let config = {
        tableName: "users",
        timestamps: false,
        deletedAt: false
    };

    const user = sequelize.define(alias, cols, config)

    user.associate = function (models) {
        user.belongsToMany(models.card, {
            as: "cards",
            through: "userscards",
            foreignKey: "user_id",
            otherKey: "card_id",
            timestamps: false
        }),
        user.belongsToMany(models.transaction, {
            as: "transactions",
            through: "userstransactions",
            foreignKey: "user_id",
            otherKey: "transactions_id",
            timestamps: false
        });
    }

    return user
}