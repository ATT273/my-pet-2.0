import { usePetStore } from "../../../stores/pet-data-store";
import { petColors } from "../../../constants/pet.constants";
import { NavLink } from "react-router";
import Menu from "./components/Menu";
import LevelInfo from "./components/LevelInfo";
import StatInfo from "./components/StatInfo";
import { useEffect, useState } from "react";
import Pet from "./components/Pet";
import { BG_IMAGE_URL } from "../../../constants/bg.constants";
import Button from "@/src/components/ui/Button";

const HomeScreen = () => {
  const petData = usePetStore((state) => state.petData);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [showBG, setShowBg] = useState<boolean>(true);

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
    <div
      className={`relative size-full bg-cover bg-center`}
      style={{
        backgroundImage: showBG ? `url(${BG_IMAGE_URL})` : "none",
      }}
    >
      <div className="absolute top-0 left-0 right-0">
        <div className=" p-2">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold">{petData.name}</p>
            <div className="flex gap-1 items-center">
              <div>
                <Button
                  className="cursor-pointer p-1 border border-zinc-600 rounded-md"
                  onClick={() => setShowBg(!showBG)}
                >
                  {showBG ? "Hide Bg" : "Show Bg"}
                </Button>
              </div>
              <Menu />
            </div>
          </div>
          <LevelInfo />
          <StatInfo />
          <div className="h-full flex items-end justify-end pb-4">
            <NavLink to="/adopt" className="bg-transparent">
              <Button title="reset game" className="bg-transparent cursor-pointer">
                🔄️
              </Button>
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
