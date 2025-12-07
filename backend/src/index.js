import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar variables de entorno
if (process.env.NODE_ENV !== "production") {
  // Solo cargar archivo .env en desarrollo local
  const { config } = await import("dotenv");
  const envFile = resolve(__dirname, "../../.env.local");
  config({ path: envFile });
}

// Validar que las variables críticas existan
if (!process.env.MONGO_URL) {
  console.error("ERROR: MONGO_URL no está definida");
  process.exit(1);
}

const app = (await import("./app.js")).default;
await import("./database.js"); // Ejecuta el código de database

async function main() {
  await app.listen(app.get("port"));
  console.log(
    `🚀 Server running on port ${app.get("port")} [${
      process.env.NODE_ENV || "development"
    }]`
  );
}

main();
