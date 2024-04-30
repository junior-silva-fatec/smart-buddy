const mongoose = require("mongoose");

const contatoSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },
});

const Contato = mongoose.model('Contato', contatoSchema);

module.exports = Contato;
