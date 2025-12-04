// Cargar variables de entorno
if (process.env.NODE_ENV !== "production") {
  // Solo cargar archivo .env en desarrollo local
  const path = require("path");
  const envFile = path.resolve(__dirname, "../../.env.local");
  require("dotenv").config({ path: envFile });
}

// Validar que las variables críticas existan
if (!process.env.MONGO_URL) {
  console.error("ERROR: MONGO_URL no está definida");
  process.exit(1);
}

const app = require("./app");
require("./database"); //Ejecuta el codigo de database

async function main() {
  await app.listen(app.get("port"));
  console.log(
    `🚀 Server running on port ${app.get("port")} [${
      process.env.NODE_ENV || "development"
    }]`
  );
}

main();
