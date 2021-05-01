const baseTemplate = (body) =>
  `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        .body {
          width: 100%;
          max-width:600px;
          height: 100%;
          padding: 30px;
          margin: 0 auto;
          border-radius: 5px;
        }
        .body h1 {
          color: rgb(85, 85, 85);
        }
        .body h3 {
          color:rgb(85, 85, 85);
        }
        .body .button {
          text-align: center;
        }
        .body .button a {
          display: inline-block;
          margin: 0 auto;
          margin-top: 10px;
          padding: 10px 20px;
          background-color: #346fdd;
          text-decoration: none;
          color: #fff;
          border-radius: 5px;
          box-shadow: 1px 1px 4px 0px #000;
          font-weight: 600;
        }
        .body .button a:hover {
          background-color: #2e5eb9;
        }
      </style>
    </head>
      ${body}
    </html>
  `;

const templates = {
  contact: (name, mail, request) => ({
    subject: `Consulta de ${mail}`,
    html: baseTemplate(`
      <body>
        <div class="body">
          <h1>Consulta de: ${name}</h1>
          <h3>Email de contacto: ${mail}</h3>
          <p>Consulta: ${request}</p>
        </div>
      </body>
    `),
  }),
  validateAccount: (user, link) => ({
    subject: 'Activa tu cuenta',
    html: baseTemplate(`
      <body>
        <div class="body">
          <h1>Hola ${user}!</h1>
          <h3>Activa tu cuenta haciendo click en el siguiente botón:</h3>
          <div class="button">
            <a href="${link}">
              ACTIVAR CUENTA
            </a>
          </div>
        </div>
      </body>
    `),
  }),
  recoverPassword: (user, link) => ({
    subject: 'Recupera tu contraseña',
    html: baseTemplate(`
      <body>
        <div class="body">
          <h1>Hola ${user}!</h1>
          <h3>Recupera tu contraseña haciendo click en el siguiente botón:</h3>
          <div class="button">
            <a href="${link}">
              RECUPERAR CONTRASEÑA
            </a>
          </div>
        </div>
      </body>
    `),
  }),
};

module.exports = templates;
