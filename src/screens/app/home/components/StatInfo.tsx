import { useEffect } from "react";
import { MAX_STAT_VALUE, MIN_STAT_VALUE, STAT_ICONS } from "../../../../constants/pet.constants";
import { usePetStore } from "../../../../stores/pet-data-store";
import { PetData, PetDataResponse, StatData } from "../../../../types/pet.types";
import { invoke } from "@tauri-apps/api/core";

const StatInfo = () => {
  const petData = usePetStore((state) => state.petData);
  const updatePetData = usePetStore((state) => state.updatePetData);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const newPetData = { ...petData, next_lv_exp: petData.nextLvExp };
      const newData: PetDataResponse = await invoke("tick_pet_stats", { petData: newPetData });
      console.log("newData",newData)
      const formatedData = {
        ...newData,
        nextLvExp: newData.next_lv_exp,
        evolveLvls: petData.evolveLvls
      }
      updatePetData(formatedData as PetData);

    }, 1000);
    return () => clearInterval(intervalId);
  }, [petData]);


  return (
    <div className="max-w-30">
      {Object.entries(petData.stats).map(([key, value]) => {
        return (
          <p className="cursor-default" title={key}>
            {STAT_ICONS[key as keyof StatData]}: {value}/{MAX_STAT_VALUE}
          </p>
        );
      })}
    </div>
  );
};

export default StatInfo;
