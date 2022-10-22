const { body } = require("express-validator");
const { card } = require("../database/models/index");

const transaction = [
    body("number").notEmpty().withMessage("Debes ingresar un número de tarjeta").bail().isNumeric().withMessage("No se permiten letras").bail().isLength({ min: 16 }).withMessage("Debes ingresar un número correcto").bail().isLength({ max: 16 }).withMessage("Debes ingresar un número correcto").bail().custom( async (value, { req }) => {
        req.body.number = parseInt(req.body.number)
        
        let cards = await card.findAll()
        
        let cardSender = req.session.user.cards.find(card => card.cardRegister === 1)
       
        let cardDB = cards.find(card => card.number === req.body.number);
        if (!cardDB) {
            throw new Error("Número no registrado")
        }

        if (req.body.number === cardSender.number) {
            throw new Error("No puedes utilizar tu tarjeta")
        }

        return true
    }),

    body("total").notEmpty().withMessage("Debes ingresar un monto").bail().isNumeric().withMessage("No se permiten letras").bail().custom(async (value, { req }) => {
        let cards = await card.findAll()
        let cardSender = req.session.user.cards.find(card => card.cardRegister === 1)

        if (value <=  0) {
            throw new Error("Ingrese un numero mayor a cero")
        }


        if (value > cardSender.total) {
            throw new Error("No tienes suficiente dinero")
        }
        
        return true

    })
]

module.exports = transaction;