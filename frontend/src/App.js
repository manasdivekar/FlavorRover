import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import SignUp from "./pages/SignUp";
import { CartProvider } from "./components/ContextReducer";
import MyOrder from "./pages/MyOrder";

function App() {
  return (
    <CartProvider>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/createUser" element={<SignUp/>} />
          <Route path="/myOrder" element={<MyOrder/>} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
