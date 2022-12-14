const { body } = require("express-validator");
const { card } = require("../database/models/index")

const addCard = [
    body("number").notEmpty().withMessage("Debes ingresar un número de tarjeta").bail().isNumeric().withMessage("No se permiten letras").bail().isLength({ min: 16 }).withMessage("Debes ingresar un número correcto").bail().isLength({ max: 16 }).withMessage("Debes ingresar un número correcto").bail().custom(async (value, { req }) => {
        value = parseInt(value);

        let cards = await card.findAll()

        cards.forEach(card => {
            if (card.number === value) {
                throw new Error("Número de tarjeta registrado")
            }
        })

        /* if (req.session && req.session.user.cards.length > 2) {
            throw new Error("No puedes agregar más tarjetas")
        } */

        /* req.session.user.cards.forEach(card => {
            if (value === card.number) {
                throw new Error("Ya tienes esta tarjeta registrada")
            }
        }) */

        return true
    }),

    body("pin").notEmpty().withMessage("Debes ingresar tú pin").bail().isNumeric().withMessage("No se permiten letras").bail().isLength({ min: 4 }).withMessage("Debes ingresar un número de cuatro dígitos").bail().isLength({ max: 4 }).withMessage("Debes ingresar un número de cuatro dígitos").bail()
]

module.exports = addCard;