const createHttpError = require("http-errors")
const Project = require("../database/models/Project")
const errorResponse = require("../helpers/errorResponse")
const ObjectId = require("mongoose").Types.ObjectId

module.exports = {
    list: async (req, res) => {
        try {

            const projects = await Project.find().where("createdBy").equals(req.user._id)

            return res.status(201).json({
                status: true,
                msg: "Lista de proyectos",
                projects
            })

        } catch (error) {
            return res.status(error.status || 500).json({
                status: false,
                msg: error.message || "Ups.. hubo un error"
            })
        }
    },

    store: async (req, res) => {
        try {
            const { name, description, client } = req.body;

            if ([name, description, client].includes("") || !name || !description || !client) {
                throw createHttpError(400, "Todos los campos son obligatorios")
            }

            if (!req.user) {
                throw createHttpError(401, "Error de autenticación")
            }

            /* Para guardar en Mongo primero se crea una instancia del modelo usando new "modelo"(objeto) */
            const project = new Project({ name, description, client });
            project.createdBy = req.user._id;

            const projecStore = await project.save()

            return res.status(201).json({
                status: true,
                msg: "Proyecto guardado",
                project: projecStore
            })

        } catch (error) {
            return res.status(error.status || 500).json({
                status: false,
                msg: error.message || "Ups.. hubo un error"
            })
        }
    },

    detail: async (req, res) => {
        try {
            const { id } = req.params;
            
            if(!ObjectId.isValid(id)) {
                throw createHttpError(404, "no es un id valido")
            }

            const project = await Project.findById(id);

            if (req.user._id.toString() !== project.createdBy.toString()) {
                throw createHttpError(401, "No estas autorizado/a")
            }


            return res.status(200).json({
                status: true,
                msg: "Proyecto encontrado",
                project
            })

        } catch (error) {
            return errorResponse(res, error, "DETAIL")
            /*             return res.status(error.status || 500).json({
                            status: false,
                            msg: error.message || "Ups.. hubo un error"
                        }) */
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, description, client, dataExpire } = req.body;
            
            if(!ObjectId.isValid(id)) {
                throw createHttpError(404, "no es un id valido")
            }

            const project = await Project.findById(id);

            if (req.user._id.toString() !== project.createdBy.toString()) {
                throw createHttpError(401, "No estas autorizado/a")
            }

            project.name = name || project.name
            project.description = description || project.description
            project.client = client || project.client
            project.dataExpire = dataExpire || project.dataExpire

            const projectUpdated = await project.save()

            return res.status(201).json({
                status: true,
                msg: "Project updated",
                project: projectUpdated
            })

        } catch (error) {
            return errorResponse(res, error, "UPDATE")
        }
    },

    remove: async (req, res) => {
        try {

            const { id } = req.params;
            
            if(!ObjectId.isValid(id)) {
                throw createHttpError(404, "no es un id valido")
            }

            const project = await Project.findById(id);

            if (req.user._id.toString() !== project.createdBy.toString()) {
                throw createHttpError(401, "No estas autorizado/a")
            }

            await project.deleteOne();

            return res.status(201).json({
                status: true,
                msg: "Project removed"
            })

        } catch (error) {
            return res.status(error.status || 500).json({
                status: false,
                msg: error.message || "Ups.. hubo un error"
            })
        }
    },

    addColaborator: async (req, res) => {
        try {
            return res.status(201).json({
                status: true,
                msg: "Colaborator added"
            })

        } catch (error) {
            return res.status(error.status || 500).json({
                status: false,
                msg: error.message || "Ups.. hubo un error"
            })
        }
    },

    removeColaborator: async (req, res) => {
        try {
            return res.status(201).json({
                status: true,
                msg: "Colaborator removed"
            })

        } catch (error) {
            return res.status(error.status || 500).json({
                status: false,
                msg: error.message || "Ups.. hubo un error"
            })
        }
    }

}