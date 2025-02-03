import { items } from '../../../data/characters.js';

// Шаблон для предмета с подсказкой
const itemWithTooltip = (itemName) => {
    const item = items[itemName];
    if (item) {
        return `
            <div class="item-with-tooltip">
                <span class="item-name">${itemName}</span>
                <div class="item-tooltip">
                    <div class="item-type">${item.type}</div>
                    <div class="item-description">${item.description}</div>
                </div>
            </div>
        `;
    }
    return itemName;
};

// Шаблоны для карточек
export const cardTemplates = {
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

    scenarioCard: (scenario, stats) => `
        <div class="scenario-card" data-scenario="${scenario.id}">
            <div class="card-content">
                <div class="scenario-image" style="background-image: url('${scenario.image}')"></div>
                <div class="scenario-overlay">
                    <h3 class="scenario-title">${scenario.title}</h3>
                    <div class="scenario-description">${scenario.description}</div>
                    <div class="scenario-stats">
                        ${cardTemplates.statBox('Улики', stats.totalClues)}
                        ${cardTemplates.statBox('Безысходность', stats.totalDespair)}
                    </div>
                    <div class="scenario-label">
                        <div>Начальная локация: ${stats.startLocation}</div>
                        <div>Монстры: ${stats.monstersCount}</div>
                    </div>
                </div>
            </div>
        </div>
    `,

    characterCard: (character) => `
        <div class="character-card" data-character="${character.id}">
            <div class="character-content">
                <div class="character-portrait" style="background-image: url('images/characters/${character.id}.jpg')"></div>
                <div class="character-info">
                    <h2 class="character-title">${character.name}</h2>
                    <div class="character-role">${character.role}</div>
                    
                    <div class="character-abilities">
                        <div class="ability-primary">
                            <span class="ability-name">${character.ability.name}:</span>
                            ${character.ability.description}
                        </div>
                        ${character.secondaryAbility ? `
                            <div class="ability-secondary">
                                <span class="ability-name">${character.secondaryAbility.name}:</span>
                                ${character.secondaryAbility.description}
                            </div>
                        ` : ''}
                        <div class="character-quote">"${character.quote}"</div>
                    </div>

                    <div class="character-stats">
                        <div class="stat-row">
                            <div class="stat-value">${character.stats.health}</div>
                            <div class="stat-icon health"></div>
                            <div class="stat-value">${character.stats.sanity}</div>
                            <div class="stat-icon sanity"></div>
                        </div>
                        <div class="stats-list">
                            <div class="stat-item">
                                <div class="stat-value">${character.stats.knowledge}</div>
                                <div class="stat-icon knowledge"></div>
                                <div class="stat-name">Знания</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value">${character.stats.influence}</div>
                                <div class="stat-icon influence"></div>
                                <div class="stat-name">Общение</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value">${character.stats.observation}</div>
                                <div class="stat-icon observation"></div>
                                <div class="stat-name">Внимание</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value">${character.stats.strength}</div>
                                <div class="stat-icon strength"></div>
                                <div class="stat-name">Сила</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-value">${character.stats.will}</div>
                                <div class="stat-icon will"></div>
                                <div class="stat-name">Воля</div>
                            </div>
                        </div>
                    </div>

                    <div class="character-items">
                        <div class="default-items">
                            <h3>Стартовое имущество:</h3>
                            <ul>
                                ${character.defaultItems.map(item => `<li>${itemWithTooltip(item)}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="choice-items">
                            <h3>Выберите одно:</h3>
                            <div class="item-choices">
                                ${character.choiceItems.map(item => `
                                    <button class="item-choice" data-item="${item}">
                                        ${itemWithTooltip(item)}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}; 