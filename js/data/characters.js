import { ROLE_TEMPLATES, DEFAULT_ITEMS, CHARACTER_ABILITIES } from './characterTemplates.js';
import { MONSTER_TEMPLATES, MONSTER_ACTIVATIONS, MONSTER_ABILITIES } from './monsterTemplates.js';

// Вспомогательная функция для получения базовых предметов
function getBaseItems(roleTemplate, defaultItems) {
    return {
        inventory: [...roleTemplate.baseInventory, `$${defaultItems.money}`],
        spells: [...(roleTemplate.baseSpells || []), ...(defaultItems.spells || [])],
        items: [...(roleTemplate.baseItems || []), ...(defaultItems.items || [])]
    };
}

// Вспомогательная функция для объединения предметов
function mergeItems(baseItems, configItems) {
    return {
        inventory: [...baseItems.inventory, ...(configItems.inventory || [])],
        spells: [...baseItems.spells, ...(configItems.spells || [])],
        items: [...baseItems.items, ...(configItems.items || [])]
    };
}

// Фабричная функция для создания персонажа
function createCharacter(config) {
    const roleTemplate = ROLE_TEMPLATES[config.roleType];
    const defaultItems = DEFAULT_ITEMS[config.roleType.toLowerCase()];
    
    if (!roleTemplate) {
        console.error(`Неизвестный тип роли: ${config.roleType}`);
        return null;
    }

    const baseItems = getBaseItems(roleTemplate, defaultItems);
    const items = mergeItems(baseItems, config);

    return {
        name: config.name,
        role: config.role,
        stats: { ...roleTemplate.stats, ...config.stats },
        ability: config.ability,
        ...items
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
    agnes: {
        id: 'agnes',
        name: 'Агнес Бейкер',
        role: 'Ведьма',
        stats: {
            will: 5,
            combat: 2,
            maxHealth: 5,
            maxSanity: 9,
            health: 5,
            sanity: 9
        },
        ability: 'Может использовать заклинания без потери рассудка',
        inventory: [],
        effects: []
    },
    detective: {
        id: 'detective',
        name: 'Детектив Джон',
        role: 'Детектив',
        stats: {
            will: 4,
            combat: 3,
            maxHealth: 7,
            maxSanity: 7,
            health: 7,
            sanity: 7
        },
        ability: 'Может использовать улики для перебросов в проверках воли',
        inventory: [],
        effects: []
    },
    professor: {
        id: 'professor',
        name: 'Профессор Армитаж',
        role: 'Учёный',
        stats: {
            will: 5,
            combat: 2,
            maxHealth: 6,
            maxSanity: 8,
            health: 6,
            sanity: 8
        },
        ability: 'Может изучать монстров, получая бонус к проверкам против них',
        inventory: [],
        effects: []
    },
    occultist: {
        id: 'occultist',
        name: 'Мари Ламбо',
        role: 'Оккультист',
        stats: {
            will: 5,
            combat: 2,
            maxHealth: 5,
            maxSanity: 9,
            health: 5,
            sanity: 9
        },
        ability: 'Может использовать заклинания без потери рассудка',
        inventory: [],
        effects: []
    }
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