import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Alert from './components/Alert';
import Home from './components/Home';
import Login from './components/login/Login';
import Signup from './components/login/Signup';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert();
    }, 1500);
  }
  return (
    <>
        <BrowserRouter>
          <Navbar/>
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/about" element={<About/>} />
              <Route exact path="/Login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/Signup" element={<Signup showAlert={showAlert}/>} /> 
            </Routes>
          </div>
        </BrowserRouter>
    </>
  );
}

export default App;