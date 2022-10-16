const { user } = require("../database/models/index");

module.exports = {
    access: async (req, res) => {
        try {
            let users = await user.findAll({
                include: {
                    all: true
                }
            });

            req.body.number = parseInt(req.body.number);

            let userDB;

            users.forEach(user => {
                user.cards.forEach(card => {
                    if (card.number === req.body.number) {
                        return userDB = user
                    }
                })
            });

            return res.status(200).json(userDB);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}