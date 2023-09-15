// import Counter from "./pages/Counter";

// libraries
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// pages
// import Home from "./pages/Home";
// import Home from "./pages/home";
import Main from "./pages/Main";
import Register from "./pages/Register";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" index element={<Main />} />
          <Route path="/register" index element={<Register />} />
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
