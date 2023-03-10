require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors')
const connectDb = require("./database/config")


const apiRouter = require("./routes/index")

const app = express();
/* Configuración de cors */
const whiteList = [process.env.URL_FRONT]
const corsOptions = {
  origin: function(origin, cb) {
    if(whiteList.includes(origin)) {
      cb(null, true)
    } else {
      cb(new Error("Error de CORS"))
      console.log("Error de corssss");
    }
  }
}

/* Conexion a la base de datos */
connectDb()

/* Middlewares de app globales */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use('/api', apiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    ok: false,
    msg: err.message? err.message : "Ups.. hubo un error"
  });
});

module.exports = app;
