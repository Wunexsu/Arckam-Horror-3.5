import { ROLE_TEMPLATES, DEFAULT_ITEMS, CHARACTER_ABILITIES } from './characterTemplates.js';
import { MONSTER_TEMPLATES, MONSTER_ACTIVATIONS, MONSTER_ABILITIES } from './monsterTemplates.js';

// Фабричная функция для создания персонажа
function createCharacter(config) {
    const roleTemplate = ROLE_TEMPLATES[config.roleType];
    const defaultItems = DEFAULT_ITEMS[config.roleType.toLowerCase()];
    
    if (!roleTemplate) {
        console.error(`Неизвестный тип роли: ${config.roleType}`);
        return null;
    }

    return {
        name: config.name,
        role: config.role,
        stats: {
            ...roleTemplate.stats,
            ...config.stats
        },
        ability: config.ability,
        inventory: [
            ...roleTemplate.baseInventory,
            `$${defaultItems.money}`,
            ...(config.inventory || [])
        ],
        spells: [
            ...(roleTemplate.baseSpells || []),
            ...(defaultItems.spells || []),
            ...(config.spells || [])
        ],
        items: [
            ...(roleTemplate.baseItems || []),
            ...(defaultItems.items || []),
            ...(config.items || [])
        ]
    };
}

// Фабричная функция для создания монстра
function createMonster(config) {
    const template = MONSTER_TEMPLATES[config.monsterType];
    
    if (!template) {
        console.error(`Неизвестный тип монстра: ${config.monsterType}`);
        return null;
    }

    return {
        name: config.name,
        health: config.health || template.baseHealth,
        attackMod: config.attackMod || template.baseAttackMod,
        activation: config.activation,
        abilities: [
            ...template.baseAbilities,
            ...(config.abilities || [])
        ]
    };
}

// Данные персонажей
export const characters = {
    "agnes": createCharacter({
        name: "Агнес Бейкер",
        role: "Мистик",
        roleType: "MYSTIC",
        ability: CHARACTER_ABILITIES.BLOOD_MAGIC
    }),
    
    "joe": createCharacter({
        name: "Джо Даймонд",
        role: "Детектив",
        roleType: "DETECTIVE",
        ability: CHARACTER_ABILITIES.DEDUCTION
    })
};

// Данные монстров
export const monsters = {
    "blindWatcher": createMonster({
        name: "Безглазый наблюдатель",
        monsterType: "WATCHER",
        activation: MONSTER_ACTIVATIONS.PURSUE
    }),
    
    "cultist": createMonster({
        name: "Культист",
        monsterType: "CULTIST",
        activation: MONSTER_ACTIVATIONS.ADD_DESPAIR
    })
}; 