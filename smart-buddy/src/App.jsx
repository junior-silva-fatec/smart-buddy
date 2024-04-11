import Header from "./components/Header";
import Event from "./components/Event";
import "./App.css";

const dados = ["João", "Maria", "José"];
const horas = ["10:30", "14:00", "15:30"]

function App() {
  return (
    <>
      <Header />
      <Event name={dados[0]} horas={horas[0]}/>
      <Event name={dados[1]} horas={horas[1]}/>
      <Event name={dados[2]} horas={horas[2]}/>      
    </>
  );
}

export default App;
