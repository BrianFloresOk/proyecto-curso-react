const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.PORT_MAIL,
    auth: {
      user: process.env.USER_MAIL,
      pass: process.env.USER_MAIL_PASS
    }
  });


module.exports = {
    confirmRegister: async (data) => {
        const { name, email, token } = data;
        try {
            const infoMail = await transport.sendMail({
                from: "Project manager <project@examples.com>",
                to: email,
                subject: "Confirmá tu cuenta",
                text: "Confirmá tu cuenta para terminar tu registro",
                html: `
                <p>Hola ${name}: Hacé click en confirmar para continuar</p>
                <a href="${process.env.URL_FRONT}/confirm/${token}">Continuar</a>
                `
            })

            console.log(infoMail);

        } catch (error) {
            console.log(error.message);
        }


    },

    forgotPassword: async (data) => {
        const { name, email, token } = data;

        try {
            const infoMail = await transport.sendMail({
                from: "Project manager <project@examples.com>",
                to: email,
                subject: "Reestablecé tu contraseña",
                text: "Seguí las instrucciones para reestablecer tu contaseña",
                html: `
                <p>Hola ${name}: Hacé click en restablecer para continuar</p>
                <a href="${process.env.URL_FRONT}/recover-password/${token}">Reestablecer</a>
                `
            })

            console.log(infoMail);

        } catch (error) {
            console.log(error.message);
        }
    },
}