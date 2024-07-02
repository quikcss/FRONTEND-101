import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useAuthContext } from "@/context";

const Home = () => {
  const navigate = useNavigate();
  const { isLogin, logout } = useAuthContext();
  return (
    <div className="w-full h-screen flex flex-col gap-7 justify-center items-center">
      {isLogin ? (
        <>
          <h1 className="tracking-tight text-4xl">
            Hello! This is a full-stack Login Page built on MERN.
          </h1>
          <Button
            onClick={logout}
            variant="link"
            className="tracking-tight text-lg hover:text-violet-500"
          >
            Click here to Logout!
          </Button>
          <h3 className="tracking-tight text-lg">
            This website was built using Cool UI Libraries such as Aceternity UI
            & Shadcn
          </h3>
        </>
      ) : (
        <>
          <h1 className="tracking-tight text-4xl">
            Hello! This is a full-stack Login Page built on MERN.
          </h1>
          <Button
            onClick={() => navigate("/login")}
            variant="link"
            className="tracking-tight text-lg hover:text-violet-500"
          >
            Click here to Login!
          </Button>
          <h3 className="tracking-tight text-lg">
            This website was built using Cool UI Libraries such as Aceternity UI
            & Shadcn
          </h3>
        </>
      )}
    </div>
  );
};

export default Home;
