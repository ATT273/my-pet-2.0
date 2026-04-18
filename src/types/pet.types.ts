export type PetData = {
  name: string;
  type: string;
  stats:StatData;
  level: number;
  sprite: string;
  exp: number;
  nextLvExp: number;
  coins: number;
  evolveLvls: number[];
}

export type StatData = {
  hunger: number;
  thirst: number;
  energy: number;
  happiness: number;
  hygiene: number;
}

export type PetDataResponse = {
    name: string;
  type: string;
  stats:StatData;
  level: number;
  sprite: string;
  exp: number;
  next_lv_exp: number;
  coins: number;
  evolve_lvls: number[];
}