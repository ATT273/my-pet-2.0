import { useCallback, useState } from "react";
import { usePetStore } from "../../../../stores/pet-data-store";
import { PetState, StatData } from "../../../../types/pet.types";
import { MAX_STAT_VALUE, PET_STATES } from "../../../../constants/pet.constants";
import Button from "@/src/components/ui/Button";

const shopItems = {
  food: {
    price: 10,
    effect: {
      hunger: 10,
    },
  },
  drink: {
    price: 10,
    effect: {
      thirst: 10,
    },
  },
  game: {
    price: 10,
    effect: {
      happiness: 10,
    },
  },
};

const Menu = () => {
  const petData = usePetStore((state) => state.petData);
  const updatePetData = usePetStore((state) => state.updatePetData);
  const [openShop, setOpenShop] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const isSleeping = petData.petState === PET_STATES.SLEEP;
  const isAwake = petData.petState === PET_STATES.AWAKE;
  const isWorking = petData.petState === PET_STATES.WORK;

  const handlePetCaretaking = useCallback(
    (stat: keyof StatData, value: number) => {
      const newPetData = { ...petData };
      newPetData.stats[stat] =
        newPetData.stats[stat] + value > MAX_STAT_VALUE ? MAX_STAT_VALUE : newPetData.stats[stat] + value;
      updatePetData(newPetData);
    },
    [petData],
  );

  const handleBuyItem = (type: string) => {
    const newPetData = { ...petData };
    newPetData.coins -= shopItems[type as keyof typeof shopItems].price;
    updatePetData(newPetData);
  };

  const gotoSleep = () => {
    const newPetData = { ...petData, petState: PET_STATES.SLEEP as PetState };
    updatePetData(newPetData);
  };

  const wakeUp = () => {
    const newPetData = { ...petData, petState: PET_STATES.AWAKE as PetState };
    updatePetData(newPetData);
  };
  return (
    <div className="relative">
      <div className="flex gap-2">
        <Button className="size-10 bg-transparent cursor-pointer" onClick={() => setOpenMenu(!openMenu)}>
          Menu
        </Button>
        <Button className="size-10 bg-transparent cursor-pointer" onClick={() => setOpenShop(!openShop)}>
          Shop
        </Button>
      </div>
      <div className={`absolute top-10 right-0 transition-all duration-700  ${openMenu ? "opacity-100" : "opacity-0"}`}>
        {openMenu && (
          <div className="flex flex-col gap-2 border rounded-xl p-2">
            <Button
              disabled={isSleeping}
              className="bg-transparent cursor-pointer"
              onClick={() => handlePetCaretaking("hunger", 10)}
            >
              Food
            </Button>
            <Button
              disabled={isSleeping}
              className="bg-transparent cursor-pointer"
              onClick={() => handlePetCaretaking("thirst", 10)}
            >
              Drink
            </Button>
            <Button
              disabled={isSleeping}
              className="bg-transparent cursor-pointer"
              onClick={() => handlePetCaretaking("happiness", 10)}
            >
              Play
            </Button>
            {isAwake || isWorking ? (
              <Button className="bg-transparent cursor-pointer" onClick={gotoSleep}>
                Sleep
              </Button>
            ) : (
              <Button className="bg-transparent cursor-pointer" onClick={wakeUp}>
                Wake up
              </Button>
            )}
            <Button
              disabled={isSleeping}
              className="bg-transparent cursor-pointer"
              onClick={() => handlePetCaretaking("hygiene", 10)}
            >
              Bath
            </Button>
          </div>
        )}
      </div>
      <div className={`absolute top-10 right-0 transition-all duration-700 ${openShop ? "opacity-100" : "opacity-0"}`}>
        {openShop && (
          <div className="border rounded-xl p-2">
            <div className="flex justify-between items-center">
              <p>Shop</p>
              <Button onClick={() => setOpenShop(false)}>❌</Button>
            </div>
            <div className="flex gap-2 justify-between items-center">
              <Button className="bg-transparent cursor-pointer" onClick={() => handleBuyItem("food")}>
                Food
              </Button>
              <Button className="bg-transparent cursor-pointer" onClick={() => handleBuyItem("drink")}>
                Drink
              </Button>
              <Button className="bg-transparent cursor-pointer" onClick={() => handleBuyItem("game")}>
                Play
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
