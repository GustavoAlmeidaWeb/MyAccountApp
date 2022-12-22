const mongoose = require("mongoose");

const main = async () => {

  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(process.env.DB_URL);

    console.log("Conectado ao Mongo!");

  } catch (error) {
    console.log(`Erro: ${error}`);
  }
  
}

module.exports = main;
