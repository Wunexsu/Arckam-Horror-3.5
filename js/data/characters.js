// Фабричная функция для создания персонажа
function createCharacter(config) {
    return {
        name: config.name,
        role: config.role,
        stats: {
            will: config.stats.will || 0,
            combat: config.stats.combat || 0,
            intellect: config.stats.intellect || 0,
            agility: config.stats.agility || 0
        },
        ability: config.ability,
        inventory: config.inventory || [],
        spells: config.spells || [],
        items: config.items || []
    };
}

// Фабричная функция для создания монстра
function createMonster(config) {
    return {
        name: config.name,
        health: config.health || 1,
        attackMod: config.attackMod || 0,
        activation: config.activation,
        abilities: config.abilities || []
    };
}

// Данные персонажей
const characters = {
    "agnes": createCharacter({
        name: "Агнес Бейкер",
        role: "Мистик",
        stats: {
            will: 3,
            combat: 2,
            intellect: 4,
            agility: 2
        },
        ability: "Кровавые чары: получать урон вместо ужаса при чтении заклинаний",
        inventory: ["Гиперборейская реликвия", "$3"],
        spells: ["Буря духов", "Защита плоти"]
    }),
    
    "joe": createCharacter({
        name: "Джо Даймонд",
        role: "Детектив",
        stats: {
            will: 2,
            combat: 3,
            intellect: 3,
            agility: 3
        },
        ability: "Дедукция: раз в ход можно перебросить проверку знаний",
        inventory: ["Револьвер .38", "$5"],
        items: ["Лупа", "Полицейский значок"]
    })
};

// Данные монстров
const monsters = {
    "blindWatcher": createMonster({
        name: "Безглазый наблюдатель",
        health: 4,
        attackMod: -1,
        activation: "Двигается к ближайшему сыщику.",
        abilities: ["Неуязвимость к физическому оружию"]
    }),
    
    "cultist": createMonster({
        name: "Культист",
        health: 2,
        attackMod: 0,
        activation: "Добавляет жетон безысходности в свой район.",
        abilities: ["Призыв подмоги"]
    })
}; 