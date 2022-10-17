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

            let data = {}
            data.id = userDB.id
            data.name = userDB.name
            data.cards = userDB.cards.map(card => Object({
                id: card.id,
                number: card.number,
                total: card.total
            }));

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    transaction: async (req, res) => {
        try {
            req.params.id = parseInt(req.params.id)

            let cards = await card.findAll({
                include: {
                    all: true
                }
            })

            let cardDB = cards.find(card => card.number === req.params.id)

            let data = {}
            data.cardId = cardDB.id
            data.cardNumber = cardDB.number
            data.transactions = cardDB.transactions.map(t => Object({
                id: t.id,
                addresse: t.addresse,
                total: t.total,
                date: t.date,
                numberTransaction: t.numberTransaction
            }))

            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}