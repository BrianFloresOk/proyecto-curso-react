const mongoose = require("mongoose");

const tasktSchema = new mongoose.Schema({
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
    state: {
        type: Boolean,
        default: false
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
    ],
    priority: {
        type: String,
        enum: ["Baja", "Media", "Alta"],
        default: 'Baja'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    },

}, {
    timestamps: true
});


module.exports = mongoose.model("Project", tasktSchema);