const { body } = require("express-validator");
const { user, card } = require("../database/models/index");
const { compareSync } = require("bcryptjs");

const login = [
    body("number").notEmpty().withMessage("Debes ingresar tú número de tarjeta").bail().isNumeric().withMessage("No se permiten letras").bail().isLength({ min: 16 }).withMessage("Debes ingresar un número correcto").bail().isLength({ max: 16 }).withMessage("Debes ingresar un número correcto").bail().custom( async (value, { req }) => {
        req.body.number = parseInt(req.body.number)
        
        let cards = await card.findAll()

        let cardDB = cards.find(card => card.number === req.body.number);

        if (!cardDB) {
            throw new Error("Número no registrado")
        }

        return true
    }),

    body("pin").notEmpty().withMessage("Debes ingresar tú pin").bail().isNumeric().withMessage("No se permiten letras").bail().isLength({ min: 4 }).withMessage("Debes ingresar un número de cuatro dígitos").bail().isLength({ max: 4 }).withMessage("Debes ingresar un número de cuatro dígitos").bail().custom(async (value, { req }) => {
        req.body.number = parseInt(req.body.number)

        let cards = await card.findAll()

        let cardDB = cards.find(card => card.number === req.body.number);

        if (!cardDB) {
            throw new Error("Usuario no encontrado")
        }

        if (!compareSync(value, cardDB.pin)) {
            throw new Error("El pin es incorrecto")
        }

        return true

    })
]

module.exports = login;