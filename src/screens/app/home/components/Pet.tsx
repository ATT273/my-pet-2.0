import { useEffect, useMemo } from "react";
import { petColors } from "../../../../constants/pet.constants";
import { usePetStore } from "../../../../stores/pet-data-store";

const evolveSize = {
  5: "size-20",
  10: "size-24",
  15: "size-28",   
}
const Pet = () => {
  const petData = usePetStore((state) => state.petData);
  const petSize = useMemo(() => {
    let  size = "size-10";
    const evolveSizeKeys = Object.keys(evolveSize);
    const evolveSizeKeysNumber = evolveSizeKeys.map((key) => Number(key));
    evolveSizeKeysNumber.forEach((key) => {
      if(petData.level >= key) {
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
  console.log(petSize);
  return (
    <div
      className={`${petSize} ${petColors[petData.type as keyof typeof petColors]}`}
    />
  );
};

export default Pet;
