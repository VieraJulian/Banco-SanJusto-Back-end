module.exports = (sequelize, DataTypes) => {
    let alias = "card"
    let cols = {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        number: {
            type: DataTypes.BIGINT
        },
        pin: {
            type: DataTypes.TEXT
        },
        total: {
            type: DataTypes.INTEGER
        }
    };
    let config = {
        tableName: "cards",
        timestamps: false,
        deletedAt: false
    };

    const card = sequelize.define(alias, cols, config)

    card.associate = function (models) {
        card.belongsToMany(models.user, {
            as: "users",
            through: "userscards",
            foreignKey: "card_id",
            otherKey: "user_id",
            timestamps: false
        }),
        card.belongsToMany(models.transaction, {
            as: "transactions",
            through: "cardstransactions",
            foreignKey: "card_id",
            otherKey: "transactions_id",
            timestamps: false
        });
    }

    return card
}