import { items } from '../../../data/characters.js';
import { locations } from '../../../data/locations.js';

// Шаблон для предмета с подсказкой
const itemWithTooltip = (itemName) => {
    const itemData = items[itemName];
    if (!itemData) {
        // Если это просто строка (например, "$3"), возвращаем её как есть
        return `<span class="item-name">${itemName}</span>`;
    }

    return `
        <div class="item-with-tooltip" onmousemove="updateTooltipPosition(event)">
            <span class="item-name">${itemName}</span>
            <div class="item-tooltip">
                <div class="item-type">${itemData.type}</div>
                <div class="item-description">${itemData.description}</div>
            </div>
        </div>
    `;
};

// Функция для обновления позиции подсказки
function updateTooltipPosition(event) {
    const tooltip = event.currentTarget.querySelector('.item-tooltip');
    if (tooltip) {
        const padding = 10;
        tooltip.style.left = `${event.clientX}px`;
        tooltip.style.top = `${event.clientY - padding}px`;
    }
}

// Шаблон для предмета в раскрытой карточке
const expandedItemTemplate = (item, isSelectable = false, isSelected = false) => {
    const itemData = items[item];
    if (!itemData) return '';

    return `
        <div class="equipment-item ${isSelectable ? 'selectable' : ''} ${isSelected ? 'selected' : ''}" data-item="${item}">
            <div class="equipment-details">
                <div class="equipment-name">${item}</div>
                <div class="equipment-type">${itemData.type}</div>
                <div class="equipment-description">${itemData.description}</div>
            </div>
        </div>
    `;
};

// Шаблон для раскрытой карточки
const expandedCharacterCard = (character, selectedItem = null) => `
    <div class="character-card-expanded">
        <div class="expanded-portrait">
            <img src="character/${character.id}.jpg" alt="${character.name}">
        </div>
        <div class="expanded-content">
            <h2>${character.name}</h2>
            
            <div class="story-section">
                <h3>С чего всё началось</h3>
                <p>${character.story}</p>
            </div>

            <div class="role-section">
                <div class="primary-role">
                    <h3>Основная роль</h3>
                    <p>Будучи хранителем, вы отвечаете за защиту других сыщиков. Например, вы можете избавляться от монстров прежде, чем они станут серьезной угрозой, или помогать своим товарищам приходить в себя после ранений.</p>
                </div>
                <div class="secondary-role">
                    <h3>Второстепенная роль</h3>
                    <p>Будучи бойцом, вы способны умело противостоять несумолимым ударам мифа и помогать в этом своим товарищам. Взаимопомощь приведёт вас к победе.</p>
                </div>
            </div>

            <div class="item-selection">
                ${character.choiceItems.map(item => `
                    <button class="item-choice ${selectedItem === item ? 'selected' : ''}" data-item="${item}">
                        ${item}
                    </button>
                `).join('')}
            </div>
        </div>
        <button class="close-expanded">&times;</button>
    </div>
`;

// Шаблоны для карточек
export const templates = {
    statBox: (label, value) => `
        <div class="stat-box">
            <div class="stat-label">${label}</div>
            <div class="stat-value">${value}</div>
        </div>
    `,

    statItem: (value, name) => `
        <div class="stat-item">
            <div class="stat-value">${value}</div>
            <div class="stat-name">${name}</div>
        </div>
    `,

    scenarioCard: (scenario, stats) => {
        if (!scenario) {
            console.error('Сценарий не определен');
            return '';
        }

        console.log('Создание шаблона карточки для сценария:', scenario.id);
        
        try {
            return `
                <div class="scenario-card" data-scenario="${scenario.id || ''}">
                    <div class="card-content">
                        <div class="scenario-image" style="background-image: url('${scenario.image || 'Resource/default-scenario.jpg'}')"></div>
                        <div class="scenario-overlay">
                            <h3 class="scenario-title">${scenario.title || 'Без названия'}</h3>
                            <p class="scenario-description">${scenario.description || 'Описание отсутствует'}</p>
                            <div class="scenario-stats">
                                ${templates.statBox('Улики', stats?.totalClues || 0)}
                                ${templates.statBox('Безысходность', stats?.totalDespair || 0)}
                            </div>
                            <div class="scenario-details">
                                <div class="scenario-location">Начальная локация: ${stats?.startLocation || 'Не указана'}</div>
                                <div class="scenario-monsters">Монстры: ${stats?.monstersCount || 0}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Ошибка при создании шаблона карточки:', error);
            return '';
        }
    },

    characterCard: (character) => {
        try {
            return `
                <div class="character-card" data-character="${character.id}">
                    <div class="character-left-side">
                        <div class="character-portrait" style="background-image: url('character/${character.id}.jpg')"></div>
                        <div class="character-items">
                            <div class="default-items">
                                <h4>Стартовое имущество:</h4>
                                <ul>
                                    ${character.defaultItems.map(item => `<li>• ${itemWithTooltip(item)}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="item-choices">
                                <h4>Выберите одно:</h4>
                                ${character.choiceItems.map((item, index) => itemChoiceTemplate(item, index)).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="character-right-side">
                        <div class="story-section">
                            <h3>С чего всё началось</h3>
                            <p>${character.story}</p>
                        </div>
                        <div class="stats-section">
                            <h3>Характеристики</h3>
                            <div class="stats-grid">
                                <div class="stat-item">
                                    <div class="stat-icon health"></div>
                                    <div class="stat-value">${character.stats.health}</div>
                                    <div class="stat-name">Здоровье</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-icon sanity"></div>
                                    <div class="stat-value">${character.stats.sanity}</div>
                                    <div class="stat-name">Рассудок</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-icon knowledge"></div>
                                    <div class="stat-value">${character.stats.knowledge}</div>
                                    <div class="stat-name">Знания</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-icon influence"></div>
                                    <div class="stat-value">${character.stats.influence}</div>
                                    <div class="stat-name">Общение</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-icon observation"></div>
                                    <div class="stat-value">${character.stats.observation}</div>
                                    <div class="stat-name">Внимание</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-icon strength"></div>
                                    <div class="stat-value">${character.stats.strength}</div>
                                    <div class="stat-name">Сила</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-icon will"></div>
                                    <div class="stat-value">${character.stats.will}</div>
                                    <div class="stat-name">Воля</div>
                                </div>
                            </div>
                        </div>
                        <div class="abilities-section">
                            <h3>Врождённые навыки</h3>
                            <div class="ability-primary">
                                <div class="ability-name">${character.ability.name}</div>
                                <div class="ability-description">${character.ability.description}</div>
                            </div>
                            <div class="ability-secondary">
                                <div class="ability-name">${character.secondaryAbility.name}</div>
                                <div class="ability-description">${character.secondaryAbility.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Ошибка при создании шаблона персонажа:', error);
            return '';
        }
    },

    expandedCharacterCard,

    gameInterfaceTemplate: (character, currentLocation) => {
        return `
            <div class="game-interface">
                <div class="top-bar">
                    <div class="character-info">
                        <div class="character-avatar">
                            <img src="${character.avatar}" alt="${character.name}">
                        </div>
                        <div class="character-name">${character.name}</div>
                        <div class="character-level">Ур. 1</div>
                    </div>
                    <div class="character-bars">
                        <div class="health-bar">
                            <div class="bar-fill" style="width: ${(character.health.current / character.health.max) * 100}%"></div>
                            <div class="bar-text">ХП: ${character.health.current}/${character.health.max}</div>
                        </div>
                        <div class="energy-bar">
                            <div class="bar-fill" style="width: ${(character.sanity.current / character.sanity.max) * 100}%"></div>
                            <div class="bar-text">Рассудок: ${character.sanity.current}/${character.sanity.max}</div>
                        </div>
                    </div>
                    <div class="location-name">
                        <div class="location-icon"></div>
                        <span>${currentLocation?.name || 'Выберите локацию'}</span>
                    </div>
                </div>
                
                <div class="main-area">
                    <div class="game-scene">
                        ${currentLocation ? locationTemplate(currentLocation) : '<div class="no-location">Выберите локацию для начала игры</div>'}
                    </div>
                    <div class="right-panel">
                        <div class="action-buttons">
                            <button class="action-btn">
                                <div class="icon search-icon"></div>
                                <span>Исследовать</span>
                            </button>
                            <button class="action-btn">
                                <div class="icon journal-icon"></div>
                                <span>Журнал заданий</span>
                            </button>
                        </div>
                        
                        <div class="location-list">
                            <h3>Доступные локации</h3>
                            ${currentLocation?.connectedTo.map(locationId => `
                                <button class="location-btn" data-location="${locationId}">
                                    <div class="icon arrow-icon"></div>
                                    <span>${locations[locationId].name}</span>
                                </button>
                            `).join('') || ''}
                        </div>
                    </div>
                </div>
                
                <div class="bottom-panel">
                    <div class="tab-buttons">
                        <button class="tab-btn active">Журнал событий</button>
                        <button class="tab-btn">Инвентарь</button>
                        <button class="tab-btn">Характеристики</button>
                    </div>
                    <div class="chat-area">
                        <div class="chat-messages">
                            <div class="message">Добро пожаловать в Аркхэм!</div>
                            ${currentLocation ? `<div class="message">Вы находитесь в локации: ${currentLocation.name}</div>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    locationTemplate
};

export function locationTemplate(location) {
    return `
        <div class="location-view">
            <div class="location-image">
                <img src="${location.image}" alt="${location.name}">
            </div>
            <div class="location-info">
                <h2>${location.name}</h2>
                <p class="location-description">${location.description}</p>
            </div>
        </div>
    `;
}

function itemChoiceTemplate(item, index) {
    return `
        <div class="item-choice-wrapper">
            <button class="item-choice" data-index="${index}">
                ${itemWithTooltip(item)}
            </button>
        </div>
    `;
}

// Экспортируем объект templates под именем cardTemplates
export const cardTemplates = templates; 