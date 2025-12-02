require("dotenv").config({ path: "../.env" }); //Importar Env
const app = require("./app");
require("./database"); //Ejecuta el codigo de database

async function main() {
  await app.listen(app.get("port"));
  console.log(`Server Listening on Port ${app.get("port")}`);
}

main();
