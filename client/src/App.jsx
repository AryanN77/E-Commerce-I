import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Auth from "./pages/auth/Auth.jsx";
import Shop from "./pages/shop/Shop.jsx";
import MyCart from "./mycart/MyCart.jsx";
import { AuthContextProvider } from "./context/auth-context.jsx";
import RefreshHandler from "./RefreshHandler.jsx";
import { ThemeProvider } from "./context/theme-context.jsx";
import User from "./pages/user/User.jsx";

function App() {
  return (
    <div className="flex flex-col min-h-full w-full">
      <Router>
        <AuthContextProvider>
          <RefreshHandler />
          <ThemeProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/mycart" element={<MyCart />} />
              <Route path="/user" element={<User />} />
            </Routes>
          </ThemeProvider>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
