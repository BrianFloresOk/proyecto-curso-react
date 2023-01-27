module.exports = {
    profile: async (req, res) => {
        try {
            return res.status(201).json({
                status: true,
                msg: "User profile"
            })
            
        } catch (error) {
            return res.status(error.status || 500).json({
                status: false,
                msg: error.message || "Ups.. hubo un error"
            })
        }
    }
}