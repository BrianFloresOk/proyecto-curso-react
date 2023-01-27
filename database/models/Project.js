const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    dataExpire: {
        type: Date,
        default: Date.now()
    },
    client: {
        type: String,
        required: true,
        trim: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, // Conexion con tabla relacionada
        ref: "User", // Nombre del alias de la tabla a consultar
    },
    collaborators: [
        {
            type: mongoose.Schema.Types.ObjectId, // Conexion con tabla relacionada
            ref: "User", // Nombre del alias de la tabla a consultar
        }
    ]


}, {
    timestamps: true
});


module.exports = mongoose.model("Project", projectSchema);