import { NavLink } from "react-router";

const WelcomePage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col bg-neutral-900">
      <h1 className="text-xl font-bold mb-4">Welcome to Desktop pet</h1>
      <div className="flex flex-col gap-4">
        <NavLink to="/create-new-pet" end>
          <button className="w-full">Adopt new pet</button>
        </NavLink>
        <NavLink to="/about" end>
          <button className="w-full">About</button>
        </NavLink>
        <NavLink to="/about" end>
          <button className="w-full">Exit</button>
        </NavLink>
      </div>
    </div>
  );
};

export default WelcomePage;
