import { usePetStore } from "../../../../stores/pet-data-store";

const LevelInfo = () => {
  const petData = usePetStore((state) => state.petData);
  return (
    <div className="max-w-40">
      <p>Level: {petData.level}</p>
      <p>
        Exp: {petData.exp}/{petData.nextLvExp}
      </p>
      <p className="cursor-default" title="Coins">💰: {petData.coins}</p>
    </div>
  );
};

export default LevelInfo;
