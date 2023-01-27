const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_CONNECTION)
        const url = `${connection.host}:${connection.port}`

        console.log(`MongoDb conectado a ${url}`)

    } catch (error) {
        console.log(`error: ${error.message}`)
    }
}


module.exports = connectDb