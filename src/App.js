import {BrowserRouter, Routes, Route} from "react-router-dom"

import Home from "./pages/Home";
import Eventos from "./pages/Eventos"
import "./App.css";

function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />         
        <Route path="/eventos" element={<Eventos />} /> 
      </Routes>
    </BrowserRouter>
    

  );
}

export default App;
