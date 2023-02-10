const errorResponse = require("../helpers/errorResponse");
const { verify } = require("jsonwebtoken");
const createHttpError = require("http-errors");
const User = require("../database/models/User");

module.exports = async (req, res, next ) => {
    
    try {
        if(!req.headers.authorization) {
            throw createHttpError(401, "Se requiere un token")
        }

        let token = req.headers.authorization;

        const decoded = verify(token, process.env.JWT_SECRET);
        /* En Mongo utilizar el signo "-" delante de la informacion que no queremos mostrar */
        /* Otra forma es solo usar la informacion que queremos ver Ej: name */
        req.user = await User.findById(decoded.id).select("name");

        next()

    } catch (error) {
        return errorResponse(res, error, "CHECK-TOKEN")
    }
}