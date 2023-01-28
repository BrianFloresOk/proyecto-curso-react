module.exports = (res, error, method) => {
    return res.status(error.status || 500).json({
        status: false,
        msg: error.message || `Ups.. hubo un error en: ${method}`
    })
}