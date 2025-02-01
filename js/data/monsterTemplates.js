// Типы монстров и их базовые характеристики
export const MONSTER_TEMPLATES = {
    WATCHER: {
        baseHealth: 4,
        baseAttackMod: -1,
        baseAbilities: ["Неуязвимость к физическому оружию"]
    },
    CULTIST: {
        baseHealth: 2,
        baseAttackMod: 0,
        baseAbilities: ["Призыв подмоги"]
    }
};

// Стандартные активации монстров
export const MONSTER_ACTIVATIONS = {
    PURSUE: "Двигается к ближайшему сыщику.",
    ADD_DESPAIR: "Добавляет жетон безысходности в свой район."
};

// Способности монстров
export const MONSTER_ABILITIES = {
    PHYSICAL_IMMUNITY: "Неуязвимость к физическому оружию",
    SUMMON_HELP: "Призыв подмоги"
}; 