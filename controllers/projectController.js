module.exports = {
    list: async (req, res) => {
        try {
            return res.status(201).json({
                status: true,
                msg: "Project list"
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
            return res.status(201).json({
                status: true,
                msg: "Project save"
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
            return res.status(200).json({
                status: true,
                msg: "One project details"
            })
            
        } catch (error) {
            return res.status(error.status || 500).json({
                status: false,
                msg: error.message || "Ups.. hubo un error"
            })
        }
    },
    
    update: async (req, res) => {
        try {
            return res.status(201).json({
                status: true,
                msg: "Project updated"
            })
            
        } catch (error) {
            return res.status(error.status || 500).json({
                status: false,
                msg: error.message || "Ups.. hubo un error"
            })
        }
    },

    remove: async (req, res) => {
        try {
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