import { useCallback, useState } from "react";
import { usePetStore } from "../../../../stores/pet-data-store";
import { StatData } from "../../../../types/pet.types";
import { MAX_STAT_VALUE } from "../../../../constants/pet.constants";

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

  const handlePetCaretaking = useCallback(
    (stat: keyof StatData, value: number) => {
      const newPetData = { ...petData };
      newPetData.stats[stat] = newPetData.stats[stat] + value > MAX_STAT_VALUE ? MAX_STAT_VALUE : newPetData.stats[stat] + value;
      updatePetData(newPetData);
    },
    [petData]
  );

  const handleBuyItem = (type: string) => {
    const newPetData = { ...petData };
    newPetData.coins -= shopItems[type as keyof typeof shopItems].price;
    updatePetData(newPetData);
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        <button
          className="size-10 bg-transparent cursor-pointer"
          onClick={() => setOpenMenu(!openMenu)}
        >
          Menu
        </button>
        <button
          className="size-10 bg-transparent cursor-pointer"
          onClick={() => setOpenShop(!openShop)}
        >
          Shop
        </button>
      </div>
      <div
        className={`absolute top-10 right-0 transition-all duration-700  ${
          openMenu ? "opacity-100" : "opacity-0"
        }`}
      >
        {openMenu && (
          <div className="flex flex-col gap-2 border rounded-xl p-2">
            <button
              className="bg-transparent cursor-pointer"
              onClick={() => handlePetCaretaking("hunger", 10)}
            >
              Food
            </button>
            <button
              className="bg-transparent cursor-pointer"
              onClick={() => handlePetCaretaking("thirst", 10)}
            >
              Drink
            </button>
            <button
              className="bg-transparent cursor-pointer"
              onClick={() => handlePetCaretaking("happiness", 10)}
            >
              Play
            </button>
            <button
              className="bg-transparent cursor-pointer"
              onClick={() => handlePetCaretaking("energy", 10)}
            >
              Sleep
            </button>
            <button
              className="bg-transparent cursor-pointer"
              onClick={() => handlePetCaretaking("hygiene", 10)}
            >
              Bath
            </button>
          </div>
        )}
      </div>
      <div
        className={`absolute top-10 right-0 transition-all duration-700 ${
          openShop ? "opacity-100" : "opacity-0"
        }`}
      >
        {openShop && (
          <div className="border rounded-xl p-2">
            <div className="flex justify-between items-center">
              <p>Shop</p>
              <button onClick={() => setOpenShop(false)}>❌</button>
            </div>
            <div className="flex gap-2 justify-between items-center">
              <button className="bg-transparent cursor-pointer" onClick={() => handleBuyItem("food")}>Food</button>
              <button className="bg-transparent cursor-pointer" onClick={() => handleBuyItem("drink")}>Drink</button>
              <button className="bg-transparent cursor-pointer" onClick={() => handleBuyItem("game")}>Play</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
