use serde::{Deserialize, Serialize};

const MIN_STAT_VALUE: i32 = 0;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct StatData {
    pub hunger: i32,
    pub happiness: i32,
    pub thirst: i32,
    pub energy: i32,
    pub hygiene: i32,
    // thêm các stat khác của bạn
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PetData {
    pub stats: StatData,
    pub exp: i32,
    pub coins: i32,
    pub level: i32,
    pub next_lv_exp: i32,
}


#[tauri::command]
pub fn tick_pet_stats(mut pet_data: PetData) -> PetData {
    // Decay tất cả stats
    let stats = &mut pet_data.stats;
    stats.hunger = (stats.hunger - 1).max(MIN_STAT_VALUE);
    stats.happiness = (stats.happiness - 1).max(MIN_STAT_VALUE);
    stats.energy = (stats.energy - 1).max(MIN_STAT_VALUE);
    stats.thirst = (stats.thirst - 1).max(MIN_STAT_VALUE);
    stats.hygiene = (stats.hygiene - 1).max(MIN_STAT_VALUE);

    // Tăng exp và coins
    pet_data.exp += 50;
    pet_data.coins += 1 * pet_data.level;

    // Level up
    if pet_data.exp >= pet_data.next_lv_exp {
        pet_data.level += 1;
        pet_data.next_lv_exp *= 2;
        pet_data.exp = 0;
    }

    pet_data
}