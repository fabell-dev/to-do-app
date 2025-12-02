// Cargar variables de entorno según el ambiente
const path = require("path");
const envFile =
  process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "../../.env.production")
    : path.resolve(__dirname, "../../.env.local");

require("dotenv").config({ path: envFile });

// Validar que las variables críticas existan
if (!process.env.MONGODB_URL) {
  console.error("ERROR: MONGODB_URL no está definida");
  process.exit(1);
}

const app = require("./app");
require("./database"); //Ejecuta el codigo de database

async function main() {
  await app.listen(app.get("port"));
  console.log(
    `🚀 Server running on port ${app.get("port")} [${
      process.env.NODE_ENV || "LOCAL"
    }]`
  );
}

main();
