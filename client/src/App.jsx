import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Auth from "./pages/auth/Auth.jsx";
import Shop from "./pages/shop/Shop.jsx";
import MyCart from "./mycart/MyCart.jsx";
import { AuthContextProvider } from "./context/auth-context.jsx";
import RefreshHandler from "./RefreshHandler.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-full w-full">
      <Router>
        <AuthContextProvider>
          <RefreshHandler />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/mycart" element={<MyCart />} />
          </Routes>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
