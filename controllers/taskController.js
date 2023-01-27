module.exports = {
    list: async (req, res) => {
        try {
            return res.status(201).json({
                status: true,
                msg: "Task list"
            })
            
        } catch (error) {
            console.log(error.message);
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
                msg: "Task save"
            })
            
        } catch (error) {
            console.log(error.message);
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
                msg: "One Task details"
            })
            
        } catch (error) {
            console.log(error.message);
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
                msg: "Task updated"
            })
            
        } catch (error) {
            console.log(error.message);
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
                msg: "Task removed"
            })
            
        } catch (error) {
            console.log(error.message);
            return res.status(error.status || 500).json({
                status: false,
                msg: error.message || "Ups.. hubo un error"
            })
        }
    },

    changeState: async (req, res) => {
        try {
            return res.status(201).json({
                status: true,
                msg: "Tarea completada"
            })
            
        } catch (error) {
            console.log(error.message);
            return res.status(error.status || 500).json({
                status: false,
                msg: error.message || "Ups.. hubo un error"
            })
        }
    },

}