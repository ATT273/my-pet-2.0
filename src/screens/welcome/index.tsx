import Button from "@/src/components/ui/Button";
import { NavLink } from "react-router";

const WelcomePage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col bg-zinc-100 text-zinc-800">
      <h1 className="text-xl font-bold mb-4">Welcome to Desktop pet</h1>
      <div className="flex flex-col gap-4">
        <NavLink to="/adopt" end>
          <Button className="w-full">Adopt new pet</Button>
        </NavLink>
        <NavLink to="/about" end>
          <Button className="w-full">About</Button>
        </NavLink>
        <NavLink to="/about" end>
          <Button className="w-full">Exit</Button>
        </NavLink>
      </div>
    </div>
  );
};

export default WelcomePage;
