// Базовые характеристики для разных ролей
export const ROLE_TEMPLATES = {
    MYSTIC: {
        stats: {
            will: 3,
            combat: 2,
            intellect: 4,
            agility: 2
        },
        baseInventory: ["Гиперборейская реликвия"],
        baseSpells: ["Буря духов"]
    },
    DETECTIVE: {
        stats: {
            will: 2,
            combat: 3,
            intellect: 3,
            agility: 3
        },
        baseInventory: ["Револьвер .38"],
        baseItems: ["Полицейский значок"]
    }
};

// Стартовые предметы по умолчанию для всех персонажей
export const DEFAULT_ITEMS = {
    mystic: {
        money: 3,
        spells: ["Защита плоти"]
    },
    detective: {
        money: 5,
        items: ["Лупа"]
    }
};

// Специальные способности персонажей
export const CHARACTER_ABILITIES = {
    BLOOD_MAGIC: "Кровавые чары: получать урон вместо ужаса при чтении заклинаний",
    DEDUCTION: "Дедукция: раз в ход можно перебросить проверку знаний"
}; 