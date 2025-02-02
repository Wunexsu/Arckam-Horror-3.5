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

// Данные предметов
export const items = {
    'Защита плоти': {
        type: 'Заклинание — чары',
        description: 'Раз в раунд, если вы, другой сыщик или союзник в любой области должен получить урон, вы можете провести проверку 💪. Предотвратите урон в количестве, равном результату проверки.'
    },
    'Буря духов': {
        type: 'Заклинание — чары',
        description: 'Вы можете провести проверку 💪 вместо 🎯 в рамках действия «атака», используя модификатор атаки монстра.'
    },
    'Гиперборейская реликвия': {
        type: 'Вещь — волшебная, диковинная',
        description: 'Прочитав заклинание, вы можете улучшить 1 навык по своему выбору.'
    }
};

// Данные персонажей
export const characters = {
    agnes: {
        id: 'agnes',
        name: 'Агнес Бейкер',
        role: 'Официантка',
        stats: {
            health: 6,
            sanity: 6,
            knowledge: 4,
            influence: 2,
            observation: 2,
            strength: 2,
            will: 3
        },
        focus: 2,
        ability: {
            name: 'Кровавые чары',
            description: 'Вы можете получать урон вместо ужаса при чтении заклинаний'
        },
        secondaryAbility: {
            name: 'Сила крови',
            description: 'Если при чтении заклинания вы получаете урон или тратите трофеи, вы получаете +2'
        },
        quote: 'Истина не всегда такова, какой кажется',
        story: 'Издавна Агнес мучили сновидения: люди в мантиях, песнопения, рычащие монстры, которых она видела краем глаза...',
        defaultItems: ['Гиперборейская реликвия', '$3'],
        choiceItems: ['Буря духов', 'Защита плоти']
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