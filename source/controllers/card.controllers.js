const { card, transaction } = require("../database/models/index");
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
                total: t.total,
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
            req.body.number = parseInt(req.body.number)
            req.body.total = (Number(req.body.total)).toFixed(2)
            const now = moment().format("YYYY/MM/DD HH:mm:ss")
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

            let cards = await card.findAll({
                include: {
                    all: true
                }
            });

            let cardDB = cards.find(card => card.number === req.body.number)
            let newTransaction = await transaction.create({
                addresse: `${cardDB.users[0].name}`,
                total: Number(req.body.total),
                date: now,
                numberTransaction: uniqueSuffix
            })

            let addCardTransaction = await cardDB.addTransaction(newTransaction)
            
            return res.status(200).json(newTransaction)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}