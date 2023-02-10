const createError = require("http-errors");
const errorResponse = require("../helpers/errorResponse");
const User = require("../database/models/User");
const tokenGenerator = require("../helpers/tokenGenerator");
const generateJWT = require("../helpers/generateJWT");
const { confirmRegister, forgotPassword } = require("../helpers/sendMails");

module.exports = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            if ([name, email, password].includes("")) {
                throw createError(400, "Todos los campos son obligatorios")
            };

            let user = await User.findOne({ email })
            if (user) {
                throw createError(400, "El email ya está registrado")
            };

            const token = tokenGenerator()

            user = new User({ name, email, password });
            user.token = token

            const userStore = await user.save();

            //To do: enviar el email de confirmación
            await confirmRegister({
                name: userStore.name,
                email: userStore.email,
                token: userStore.token
            })

            return res.status(201).json({
                status: true,
                msg: "Se envió un email con instrucciones para validar tu cuenta",
                data: userStore
            });

        } catch (error) {
            return errorResponse(res, error, "Register");
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            if ([email, password].includes("")) {
                throw createError(400, "Todos los campos son obligatorios")
            };

            let user = await User.findOne({ email });
            if (!user) {
                throw createError(403, "Credenciales inválidas | EMAIL")
            };

            /*                 User.findOne({email}, function(err, user) {
                                if (err) return handleError(err);
                                console.log(user);
                                }); */

            if (!user.checked) {
                throw createError(403, "Tu cuenta no ha sido confirmada")
            };

            if (!await user.checkedPassword(password)) {
                throw createError(403, "Credenciales inválidas | PASSWORD")
            };

            return res.status(200).json({
                status: true,
                msg: "User has been logged",
                user: {
                    nombre: user.name,
                    _id: user._id,
                },
                token: generateJWT({
                    id: user._id
                })
            });

        } catch (error) {
            return errorResponse(res, error, "Login");
        }
    },

    checked: async (req, res) => {
        const { token } = req.query; //http://localhost:puerto/api/auth/checked?token=alksjdal1lkd123js

        try {

            if (!token) {
                throw createError(400, "Missing token")
            };

            const user = await User.findOne({ token })
            if (!user) {
                throw createError(400, "Invalit token")
            };

            user.checked = true;
            user.token = "";

            await user.save()

            return res.status(201).json({
                status: true,
                msg: "Usuario validado"
            })
        } catch (error) {
            return errorResponse(res, error, "Checked")
        }
    },

    sendToken: async (req, res) => {
        const { email } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                throw createError(400, "Email incorrecto")
            }

            user.token = tokenGenerator()

            const userStore = await user.save();

            //Task to do: Enviar email para reestablecer la contraseña
            await forgotPassword({
                name: userStore.name,
                email: userStore.email,
                token: userStore.token
            })


            return res.status(200).json({
                status: true,
                msg: "Token send and email"
            })
        } catch (error) {
            return errorResponse(res, error, "Send token")
        }
    },

    verifyToken: async (req, res) => {
        try {

            const { token } = req.query;

            if (!token) {
                throw createError(400, "No hay token de petición")
            }

            const user = await User.findOne({ token })

            if (!user) {
                throw createError(400, "Token inválido")
            }

            return res.status(200).json({
                status: true,
                msg: "Token validado"
            })
        } catch (error) {
            return errorResponse(res, error, "Verificar token")
        }
    },

    changePassword: async (req, res) => {
        try {

            const { token } = req.query;
            const { password } = req.body;

            if (!password) {
                throw createError(400, "Password es obligatorio")
            }

            let user = User.findOne({ token })
            if (!user) {
                throw createError(400, "El token es inválido")
            }

            user.password = password;
            user.token = "";

            await user.save();

            return res.status(200).json({
                status: true,
                msg: "Contraseña actualizada correctamente"
            })
        } catch (error) {
            return errorResponse(res, error, "Change password")
        }
    },

}