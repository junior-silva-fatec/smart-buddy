import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from "./components/Header";
import Event from "./components/Event";
import Home from "./pages/Home"
import Login from "./pages/Login"
import "./App.css";

const dados = ["João", "Maria", "José"];
const horas = ["10:30", "14:00", "15:30"]

function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </BrowserRouter>
    

  );
}

export default App;
