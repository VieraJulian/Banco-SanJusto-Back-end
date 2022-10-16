const { user, card } = require("../database/models/index");
const { validationResult } = require('express-validator');
const { compareSync, hashSync } = require("bcryptjs");

module.exports = {
    access: async (req, res) => {
        try {
            let validaciones = validationResult(req);
            let { errors } = validaciones

            if (errors && errors.length > 0) {
                return res.status(200).json(errors);
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
    }
}