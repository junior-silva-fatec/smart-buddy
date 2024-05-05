const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

const contatoRouter = require("./routes/contatoRoutes");
app.use("/contatos", contatoRouter);
const userRouter = require("./routes/userRoutes");
app.use("/users", userRouter);
const eventRouter = require("./routes/eventRoutes");
app.use("/events", eventRouter);
const loginRouter = require("./routes/loginRoutes");
app.use("/login", loginRouter);

mongoose.connect("mongodb+srv://araujosilva:OUFbKtBwqFQo1R5h@clusteraulaintegracao.hlirbyy.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAulaIntegracao ", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erro de conexão ao MongoDB"));
db.once("open", () => {
  console.log("Conectado ao MongoDB Atlas!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
