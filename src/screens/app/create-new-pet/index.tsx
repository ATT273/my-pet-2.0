import { useEffect, useState } from "react";
import { usePetStore } from "../../../stores/pet-data-store";
import { NavLink } from "react-router";
import { petColors } from "../../../constants/pet.constants";

const CreateNewPetPage = () => {
  const { petData: petStoreData, updatePetData, resetPet } = usePetStore();
  useEffect(() =>{
    console.log(petStoreData)
    resetPet()
  },[]);
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
    // setPetData({
    //   name: "",
    //   type: "",
    // });
  };
  console.log(petData);
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full p-8">
      {step === 1 && (
        <>
          <h1 className="text-xl font-bold">What is your pet's name: </h1>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={petData.name}
              onChange={(e) => setPetData({ ...petData, name: e.target.value })}
              placeholder="Pet name"
              className="w-[300px]"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button onClick={handleNextStep}>Agree</button>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div className="flex justify-between gap-4">
            <div
              className={`size-20 ${petColors.fire} hover:border-2 border-amber-500 cursor-pointer`}
              onClick={() => setPetData({ ...petData, type: "fire" })}
            >
              1
            </div>
            <div
              className={`size-20 ${petColors.water} hover:border-2 border-amber-500 cursor-pointer`}
              onClick={() => setPetData({ ...petData, type: "water" })}
            >
              2
            </div>
            <div
              className={`size-20 ${petColors.air} hover:border-2 border-amber-500 cursor-pointer`}
              onClick={() => setPetData({ ...petData, type: "air" })}
            >
              3
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={handleBackStep}>Back</button>
            <button onClick={handleCreatePet}>Confirm</button>
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <p>This is your pet information.</p>
          <p>Are you sure you want to adopt this pet?</p>
          <div
            className={`size-20 ${
              petColors[petStoreData.type as keyof typeof petColors]
            }`}
          ></div>
          <p>
            Pet info: {petStoreData.name} / {petStoreData.type}
          </p>
          <div className="flex gap-2">
            <button onClick={handleBackStep}>No</button>
            <NavLink to="/home">
              <button onClick={handleCreatePet}>Adopt</button>
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateNewPetPage;
