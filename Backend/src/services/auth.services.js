const db = require('./config/database')

class authsServices {
    async register(data){
        const { name, email, password } = data

        if (!name || !email || !password || password.lenght < 6 ) throw new Error({status: 400})

        if ()
    }
}