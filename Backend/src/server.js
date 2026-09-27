const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config

const db = require('./config/database')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3000
        this.server = require("http").createServer(this.app)

        this.paths = {
            user: 'api/user'
        }

        this.connectDatabase()

        this.app.use(express.json())

        this.middlewares()

        this.routes()
    }

    async connectDatabase() {
        await db.authenticate().then(() => {
            console.log("Base de datos conectada exitosamente.")
        }).catch((err) => {
            console.error("No se pudo establecer conexión con la base de datos", err)
        })

        // carga de modelos a la base de datos
        await User.sync({ force: false })
    }

    middlewares() {
        this.app.use(morgan('dev'))
        this.app.use(cors())
    }

    routes() {
        this.app.use(this.paths.user, require('./routes/user.route'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`El servidor se esta ejecutando en la url: http://localhost:${this.PORT}`)
        })
    }
}

module.exports = Server