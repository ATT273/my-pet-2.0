import { useEffect, useState } from "react";
import { usePetStore } from "../../../stores/pet-data-store";
import { NavLink } from "react-router";
import { PET_EGGS } from "../../../constants/pet.constants";
import Button from "@/src/components/ui/Button";
import { cn } from "@/src/libs/utils";
import { PetType } from "@/src/types/pet.types";

const CreateNewPetPage = () => {
  const { petData: petStoreData, updatePetData, resetPet } = usePetStore();
  useEffect(() => {
    resetPet();
  }, []);
  const [petData, setPetData] = useState({
    name: "",
    type: "",
  });

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const handleNextStep = () => {
    if (step === 1 && petData.name === "") {
      setError("Please enter pet name");
      return;
    }
    setError("");
    setStep(step + 1);
  };

  const handleBackStep = () => {
    setStep(step - 1);
  };

  const handleCreatePet = () => {
    updatePetData(petData);
    setStep(3);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full p-8 bg-zinc-100 text-zinc-800">
      {step === 1 && (
        <>
          <h1 className="text-xl font-bold">What is your pet's name: </h1>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={petData.name}
              onChange={(e) => setPetData({ ...petData, name: e.target.value })}
              placeholder="Enter pet name"
              className="w-75 border border-zinc-800 p-2 rounded-md"
            />
            {error && <p className="text-red-500">{error}</p>}
            <Button className="bg-emerald-300" onClick={handleNextStep}>
              Agree
            </Button>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <h2 className="text-2xl font-semibold">Chose your pet</h2>
          <div className="flex justify-between gap-4">
            <div
              className={cn(
                "size-20 border-2 border-transparent hover:border-amber-500 cursor-pointer bg-contain bg-no-repeat bg-center",
                petData.type === "fire" ? "border-amber-500" : "",
              )}
              onClick={() => setPetData({ ...petData, type: "fire" })}
              style={{ backgroundImage: `url(${PET_EGGS.fire})` }}
            />
            <div
              className={cn(
                "size-20 border-2 border-transparent hover:border-amber-500 cursor-pointer bg-contain bg-no-repeat bg-center",
                petData.type === "water" ? "border-amber-500" : "",
              )}
              onClick={() => setPetData({ ...petData, type: "water" })}
              style={{ backgroundImage: `url(${PET_EGGS.water})` }}
            />
            <div
              className={cn(
                "size-20 border-2 border-transparent hover:border-amber-500 cursor-pointer bg-contain bg-no-repeat bg-center",
                petData.type === "grass" ? "border-amber-500" : "",
              )}
              onClick={() => setPetData({ ...petData, type: "grass" })}
              style={{ backgroundImage: `url(${PET_EGGS.grass})` }}
            />
          </div>
          <div className="flex gap-2">
            <Button className="bg-zinc-200 w-20" onClick={handleBackStep}>
              Back
            </Button>
            <Button className="bg-emerald-300 w-20" onClick={handleCreatePet}>
              Confirm
            </Button>
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <p>This is your pet information.</p>
          <p>Are you sure you want to adopt this pet?</p>
          <div
            className={`size-20 bg-contain bg-no-repeat bg-center`}
            style={{
              backgroundImage: `url(${PET_EGGS[petStoreData.type as PetType]})`,
            }}
          />
          <p>
            Pet name: {petStoreData.name} / Pet type: {petStoreData.type}
          </p>
          <div className="flex gap-2">
            <Button className="bg-zinc-200 w-20" onClick={handleBackStep}>
              No
            </Button>
            <NavLink to="/home">
              <Button className="bg-emerald-300 w-20">Adopt</Button>
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateNewPetPage;
