import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/context";

const Navbar = () => {
  const { isLogin, user, logout } = useAuthContext();
  const navigate = useNavigate();
  return (
    <div className="w-full flex px-20 py-5 fixed top-0 left-0 justify-between items-center">
      <Link to="/">
        <h1 className="tracking-tight text-4xl font-semibold">MERN-Login</h1>
      </Link>
      <div className="flex items-center gap-7">
        {isLogin ? (
          <>
            <h3 className="tracking-tight text-lg font-semibold">
              Welcome <span className="text-violet-500">{user}</span>!
            </h3>
            <Button
              onClick={logout}
              className="tracking-tight text-[17px] bg-white text-black hover:bg-violet-500"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => navigate("/login")}
              className="tracking-tight text-[17px] bg-white text-black hover:bg-violet-500"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/signup")}
              className="tracking-tight text-[17px] bg-white text-black hover:bg-violet-500"
            >
              Signup
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
