import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col gap-7">
      <h1 className="tracking-tight text-4xl font-semibold">
        404 Error, the requested URL could not be found :(
      </h1>
      <Button
        onClick={() => navigate("/")}
        variant="link"
        className="tracking-tight text-lg hover:text-violet-500"
      >
        Go to the Home Page
      </Button>
    </div>
  );
};

export default Error;
