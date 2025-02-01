// Данные персонажей
const characters = {
    "agnes": {
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
    },
    "joe": {
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
    }
};

// Данные монстров
const monsters = {
    "blindWatcher": {
        name: "Безглазый наблюдатель",
        health: 4,
        attackMod: -1,
        activation: "Двигается к ближайшему сыщику.",
        abilities: ["Неуязвимость к физическому оружию"]
    },
    "cultist": {
        name: "Культист",
        health: 2,
        attackMod: 0,
        activation: "Добавляет жетон безысходности в свой район.",
        abilities: ["Призыв подмоги"]
    }
}; 