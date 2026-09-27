const { validationResult } = require("express-validator")

const validateFields = (req, res, next) => {
    const errors = validationResult(req) // validamos errores en el cuerpo del req

    if (!errors.isEmpty()) { // si la lista de errores no esta vacía
        return res.status(400).json({
            success: false,
            message: "Error en el formato de los datos",
            errors: errors.array().map((e) => ({ // recorre cada error de la lista
                field: e.path, // nombre del campo que fallo
                message: e.msg // mensaje de error
            }))
        })
    }

    next()
}

module.exports = validateFields