const { user, card } = require("../database/models/index");
const { validationResult } = require('express-validator');

module.exports = {
    access: async (req, res) => {
        try {
            let validaciones = validationResult(req);
            let { errors } = validaciones
            let errorMsg = errors.map(e => Object({
                param: e.param,
                value: e.value,
                msg: e.msg
            }))

            if (errors && errors.length > 0) {
                return res.status(200).json(errorMsg);
            };

            req.body.number = parseInt(req.body.number);

            let cards = await card.findAll({
                include: {
                    all: true
                }
            })

            let cardDB = cards.find(card => card.number === req.body.number)

            let users = await user.findAll({
                include: {
                    all: true
                }
            });

            let userDB;

            users.forEach(user => {
                user.cards.forEach(card => {
                    if (card.number === req.body.number) {
                        return userDB = user
                    }
                })
            });

            let data = {}
            data.id = userDB.id
            data.name = userDB.name
            data.cards = userDB.cards.map(card => Object({
                id: card.id,
                number: card.number,
                total: card.total,
                cardRegister: card.id === cardDB.id ? 1 : 0
            }))

            req.session.user = data

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}