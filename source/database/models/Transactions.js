module.exports = (sequelize, DataTypes) => {
    let alias = "transaction"
    let cols = {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        addresse: {
            type: DataTypes.STRING
        },
        total: {
            type: DataTypes.INTEGER
        },
        date: {
            type: DataTypes.DATE
        },
        numberTransaction: {
            type: DataTypes.BIGINT
        }
    };
    let config = {
        tableName: "transactions",
        timestamps: false,
        deletedAt: false
    };

    const transaction = sequelize.define(alias, cols, config)

    transaction.associate = function (models) {
        transaction.belongsToMany(models.user, {
            as: "users",
            through: "userstransactions",
            foreignKey: "transactions_id",
            otherKey: "user_id",
            timestamps: false
        })

    }

    return transaction
}