//conexion a la base de datos
const mongoose = require("mongoose");
const dns = require("node:dns");
const { leerUriMongo } = require("./entorno");

// Configura los servidores DNS para resolver nombres de host de MongoDB
dns.setServers(["8.8.8.8", "1.1.1.1"]);

async function conectarBaseDatos() {
  await mongoose.connect(leerUriMongo(), {
    serverSelectionTimeoutMS: 5000,
  });
}

async function desconectarBaseDatos() {
  await mongoose.disconnect();
}

module.exports = { conectarBaseDatos, desconectarBaseDatos };
