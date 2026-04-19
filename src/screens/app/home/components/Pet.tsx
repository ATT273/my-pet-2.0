import { useEffect, useMemo } from "react";
import { PET_EGGS } from "../../../../constants/pet.constants";
import { usePetStore } from "../../../../stores/pet-data-store";
import { PetType } from "@/src/types/pet.types";

const evolveSize = {
  5: 80,
  10: 96,
  15: 112,
};
const Pet = () => {
  const petData = usePetStore((state) => state.petData);
  const petSize = useMemo(() => {
    let size = 40;
    const evolveSizeKeys = Object.keys(evolveSize);
    const evolveSizeKeysNumber = evolveSizeKeys.map((key) => Number(key));
    evolveSizeKeysNumber.forEach((key) => {
      if (petData.level >= key) {
        size = evolveSize[key as keyof typeof evolveSize];
      }
    });

    return size;
  }, [petData.level]);

  useEffect(() => {
    if (petData.evolveLvls.includes(petData.level)) {
      alert("Your pet has evolved!");
    }
  }, [petData.level]);

  return (
    <div
      style={{
        width: petSize,
        height: petSize,
        backgroundImage: `url(${PET_EGGS[petData.type as PetType]})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    />
  );
};

export default Pet;
