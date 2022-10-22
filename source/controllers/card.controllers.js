const { user, card, transaction } = require("../database/models/index");
const { validationResult } = require('express-validator');
const { hashSync } = require("bcryptjs")
const moment = require("moment/moment");

module.exports = {
    cardTransactions: async (req, res) => {
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
                total: Number(t.total),
                date: t.date,
                numberTransaction: t.numberTransaction
            }))
            
            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    transaction: async (req, res) => {
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

            req.body.number = parseInt(req.body.number)
            req.body.total = (Number(req.body.total)).toFixed(2)
            const now = moment().format("YYYY/MM/DD HH:mm:ss")
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

            let cards = await card.findAll({
                include: {
                    all: true
                }
            });

            let numberRegister = req.session.user.cards.filter(card => card.cardRegister === 1)
            let cardSender = cards.find(card => card.number === numberRegister[0].number)
            let cardAddresse = cards.find(card => card.number === req.body.number)
            await card.update({
                total: cardSender.total - Number(req.body.total)
            }, {
                where: {
                    id: cardSender.id
                }
            })

            await card.update({
                total: cardAddresse.total + Number(req.body.total)
            }, {
                where: {
                    id: cardAddresse.id
                }
            })

            let newTransaction = await transaction.create({
                addresse: `${cardAddresse.users[0].name}`,
                total: Number(req.body.total),
                date: now,
                numberTransaction: uniqueSuffix
            })

            let addCardTransaction = await cardSender.addTransaction(newTransaction)

            numberRegister[0].total = cardSender.total - Number(req.body.total)

            return res.status(200).json(newTransaction)
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    addCard: async (req, res) => {
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

            req.body.number = parseInt(req.body.number)

            let min = 20
            let max = 100000

            let newCard = await card.create({
                number: req.body.number,
                pin: hashSync(req.body.pin, 10),
                total: Math.floor(Math.random() * (max - min + 1) + min)
            })

            let userLogin = await user.findOne({
                where: {
                    name: req.session.user.name
                }
            })

            await userLogin.addCard(newCard)

            req.session.user.cards.push({
                id: newCard.id,
                number: newCard.number,
                total: newCard.total,
                cardRegister: 0
            })

            return res.status(200).json(newCard)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}