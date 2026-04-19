# My Pet 2.0

A virtual pet desktop app built with Tauri + React + TypeScript.

Raise your pet, let it work to earn coins, and use coins to buy food, drinks, and items to keep your pet happy and thriving.

## Tech Stack

- **Tauri** (Rust backend + JS frontend)
- **React** + **TypeScript**
- **Tailwind CSS**
- **Framer Motion**

## Features

### Pet Selection
- Choose from 3 types of eggs
- Each egg type has 3 pet variants, each with 3 evolution forms

### Pet Stats
| Stat | Max | Decay |
|------|-----|-------|
| Hunger | 100 | 0.5/s |
| Thirst | 100 | 0.5/s |
| Hygiene | 100 | 0.5/s |
| Happy | 100 | 0.5/s |
| Energy | 100 | 0.5/s |
| XP/Level | — | +0.2/s |
| Coins | — | earned by working |

### Items
- **Food** — increases Hunger + Happy (+ Energy)
- **Drink** — increases Thirst (+ Energy)
- **Household** — increases stats based on item effects

### Work System
- Pet works automatically when conditions are met
- Stops working when: Hunger/Thirst < 50, Happy < 30, or Energy < 30
- When needs drop below threshold, pet seeks sources to recover
- Coin earnings depend on pet level and equipped items

### Movement
- Pet moves freely on screen
