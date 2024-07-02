import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Error from "./pages/Error404/Error";
import Navbar from "./components/Navbar";
import BgSpotlight from "./components/BgSpotlight";
import { AuthContextProvider } from "./context";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const App = () => {
  const [user, setUser] = useState<String | null>(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user).message);
      setIsLogin(true);
    }
  }, []);

  const login = (user: String | null) => {
    setUser(user);
    setIsLogin(true);
  };

  const logout = () => {
    setIsLogin(false);
    localStorage.clear();
  };

  return (
    <div>
      <AuthContextProvider value={{ user, isLogin, login, logout }}>
        <Navbar />
        <BgSpotlight />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={isLogin ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={isLogin ? <Navigate to="/" /> : <Signup />}
          />
          <Route path="/*" element={<Error />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
};

export default App;
