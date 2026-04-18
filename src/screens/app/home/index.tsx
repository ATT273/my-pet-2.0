import { usePetStore } from "../../../stores/pet-data-store";
import { petColors } from "../../../constants/pet.constants";
import { NavLink } from "react-router";
import Menu from "./components/Menu";
import LevelInfo from "./components/LevelInfo";
import StatInfo from "./components/StatInfo";
import { useEffect, useState } from "react";
import Pet from "./components/Pet";

const HomeScreen = () => {
  const petData = usePetStore((state) => state.petData);
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    Object.entries(petData.stats).forEach(([key, value]) => {
      if (value <= 50) {
        if (!alerts.includes(key)) {
          setAlerts((prev) => [...prev, key]);
        }
      } else {
        if (alerts.includes(key)) {
          setAlerts((prev) => prev.filter((alert) => alert !== key));
        }
      }
    });
  }, [petData]);


  return (
    <div className="relative size-full bg-white">
      <div className="absolute top-0 left-0 right-0">
        <div className=" p-2">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold">{petData.name}</p>
            <Menu />
          </div>
          <LevelInfo />
          <StatInfo />
          <div className="h-full flex items-end justify-end pb-4">
            <NavLink to="/create-new-pet" className="bg-transparent">
              <button className="bg-transparent cursor-pointer">🔄️</button>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="h-full flex items-end justify-center pb-4">
        <div>
          {alerts.map((alert) => (
            <p key={alert}>{alert}</p>
          ))}
        </div>
       <Pet />
      </div>
    </div>
  );
};

export default HomeScreen;
