module.exports = {
    register: async (req, res) => {
        try {
            const { name, email, password} = req.body;

            if([name, email, password].includes("")){
                let error = new Error("Todos los campos son obligatorios")
                error.status = 400;
                throw error
            }

            return res.status(201).json({
                status: true,
                msg: "User has been register"
            })
            
        } catch (error) {
            return res.status(error.status || 500).json({
                status: false,
                msg: error.message || "Ups.. hubo un error"
            })
        }
    },

    login: async (req, res) => {
        try {
            return res.status(200).json({
                status: true,
                msg: "User has been logged"
            })
            
        } catch (error) {
            return res.status(error.status || 500).json({
                status: false,
                msg: error.message || "Ups.. hubo un error"
            })
        }
    },

    checked: async (req, res) => {
        try {
            return res.status(201).json({
                status: true,
                msg: "User checked"
            
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                status: false,
                msg: error.message || "Ups.. hubo un error"
            })
        }
    },

    sendToken: async (req, res) => {
        try {
            return res.status(200).json({
                status: true,
                msg: "Token send"
            
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                status: false,
                msg: error.message || "Ups.. hubo un error"
            })
        }
    },
    
    verifyToken: async (req, res) => {
        try {
            return res.status(200).json({
                status: true,
                msg: "Verified token"
            
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                status: false,
                msg: error.message || "Ups.. hubo un error"
            })
        }
    },

    changePassword: async (req, res) => {
        try {
            return res.status(200).json({
                status: true,
                msg: "Password updated"
            
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                status: false,
                msg: error.message || "Ups.. hubo un error"
            })
        }
    },


}