import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <div className="h-screen w-full flex-col space-y-3 flex items-center justify-center">
      <h1 className="text-xl">Unauthorized Page</h1>
      <Link className="block " to="/">
        <Button> Home</Button>
      </Link>
    </div>
  );
};

export default Unauthorized;
