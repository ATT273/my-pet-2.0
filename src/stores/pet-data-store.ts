import { create } from 'zustand'
import { PetData } from '../types/pet.types';
import { cloneDeep } from 'lodash-es';

type PetStore = {
  petData: PetData;
  updatePetData: (newPetData: Partial<PetData>) => void;
  resetPet: () => void;
}
const initialState: PetData = {
  name: "",
  type: "",
  stats: {
    hunger: 100,
    thirst: 100,
    energy: 100,
    happiness: 100,
    hygiene: 100
  },
  level: 1,
  evolveLvls: [5,10,15],
  sprite: "",
  exp: 0,
  nextLvExp: 100,
  coins: 0
};

export const usePetStore = create<PetStore>((set) => ({
  petData: cloneDeep(initialState),
  updatePetData: (newPetData: Partial<PetData>) => set((state) => ({ petData: {...state.petData, ...newPetData} })),
  resetPet: () => set({ petData: cloneDeep(initialState) })
}))