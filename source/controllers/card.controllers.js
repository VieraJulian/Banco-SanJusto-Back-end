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
            req.params.id = parseInt(req.params.id)
            const now = moment().format("YYYY/MM/DD HH:mm:ss")
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

            let cards = await card.findAll({
                include: {
                    all: true
                }
            });

            let cardSender = cards.find(card => card.number === req.params.id)
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


            req.session.user.cards = req.session.user.cards.map(card => Object({
                ...card, total: card.id === cardSender.id ? cardSender.total - Number(req.body.total) : card.total
            }));

            req.session.user.cards = req.session.user.cards.map(card => Object({
                ...card, total: card.id === cardAddresse.id ? cardAddresse.total + Number(req.body.total) : card.total
            }))

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

            let userCard = await card.findOne({
                include: {
                    all:true
                }, where: {
                    number: req.body.userCard
                }
            })

            let idUser = userCard.dataValues.users[0].dataValues.id
            
            let userLogin = await user.findOne({
                where: {
                    id: idUser
                }
            })

            await userLogin.addCard(newCard)

            let cardNewUser = ({
                id: newCard.id,
                number: newCard.number,
                total: newCard.total,
                cardRegister: 0
            })

            return res.status(200).json(cardNewUser)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}