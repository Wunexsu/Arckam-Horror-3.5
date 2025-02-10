import { items } from '../../data/items.js';

// Шаблоны для карточек
export const cardTemplates = {
    // Шаблон карточки сценария
    scenarioCard: (scenario) => `
        <div class="card-content">
            <div class="scenario-image" style="background-image: url('${scenario.image}')"></div>
            <div class="scenario-overlay">
                <h3 class="scenario-title">${scenario.title}</h3>
                <p class="scenario-description">${scenario.description}</p>
                <div class="scenario-stats">
                    <div class="stat-box">
                        <div class="stat-label">Сложность</div>
                        <div class="stat-value">${scenario.difficulty}</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-label">Время</div>
                        <div class="stat-value">${scenario.estimatedTime}</div>
                    </div>
                </div>
                <div class="scenario-details">
                    <div class="scenario-location">Начальная локация: ${scenario.startArea}</div>
                    <div class="scenario-monsters">Монстры: ${Object.keys(scenario.monsters).length}</div>
                </div>
            </div>
        </div>
    `,

    // Шаблон карточки персонажа
    characterCard: (character) => `
        <div class="character-card" data-character="${character.id}">
            <div class="character-header">
                <h3 class="character-name">${character.name}</h3>
                <div class="character-role">${character.role}</div>
            </div>
            
            <div class="character-main-content">
                <div class="character-portrait" style="background-image: url('character/${character.id}.jpg')"></div>
                
                <div class="character-stats">
                    <div class="stats-column">
                        <div class="stat-group">
                            <div class="stat-icon health"></div>
                            <div class="stat-info">
                                <div class="stat-label">❤️ Здоровье</div>
                                <div class="stat-value">${character.stats?.health || 0}</div>
                            </div>
                        </div>
                        <div class="stat-group">
                            <div class="stat-icon knowledge"></div>
                            <div class="stat-info">
                                <div class="stat-label">📚 Знания</div>
                                <div class="stat-value">${character.stats?.knowledge || 0}</div>
                            </div>
                        </div>
                        <div class="stat-group">
                            <div class="stat-icon observation"></div>
                            <div class="stat-info">
                                <div class="stat-label">👁️ Внимание</div>
                                <div class="stat-value">${character.stats?.observation || 0}</div>
                            </div>
                        </div>
                        <div class="stat-group">
                            <div class="stat-icon will"></div>
                            <div class="stat-info">
                                <div class="stat-label">✨ Воля</div>
                                <div class="stat-value">${character.stats?.will || 0}</div>
                            </div>
                        </div>
                    </div>
                    <div class="stats-column">
                        <div class="stat-group">
                            <div class="stat-icon sanity"></div>
                            <div class="stat-info">
                                <div class="stat-label">🧠 Рассудок</div>
                                <div class="stat-value">${character.stats?.sanity || 0}</div>
                            </div>
                        </div>
                        <div class="stat-group">
                            <div class="stat-icon influence"></div>
                            <div class="stat-info">
                                <div class="stat-label">💬 Общение</div>
                                <div class="stat-value">${character.stats?.influence || 0}</div>
                            </div>
                        </div>
                        <div class="stat-group">
                            <div class="stat-icon strength"></div>
                            <div class="stat-info">
                                <div class="stat-label">💪 Сила</div>
                                <div class="stat-value">${character.stats?.strength || 0}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="character-abilities">
                ${character.ability ? `
                    <div class="ability-primary">
                        <div class="ability-name">${character.ability.name}</div>
                        <div class="ability-description">${character.ability.description}</div>
                    </div>
                ` : ''}
                ${character.secondaryAbility ? `
                    <div class="ability-secondary">
                        <div class="ability-name">${character.secondaryAbility.name}</div>
                        <div class="ability-description">${character.secondaryAbility.description}</div>
                    </div>
                ` : ''}
            </div>

            <div class="character-items">
                ${character.defaultItems?.length ? `
                    <div class="default-items">
                        <h4>Стартовое имущество:</h4>
                        <ul>
                            ${character.defaultItems.map(item => `
                                <li class="item-with-tooltip">
                                    ${item}
                                    <div class="item-tooltip">
                                        <div class="item-type">${items[item]?.type || 'Предмет'}</div>
                                        <div class="item-description">${items[item]?.description || 'Описание отсутствует'}</div>
                                    </div>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}
                ${character.choiceItems?.length ? `
                    <div class="item-choices">
                        <h4>Выберите один предмет:</h4>
                        ${character.choiceItems.map(item => `
                            <div class="item-choice" data-item="${item}">
                                ${item}
                                <div class="item-tooltip">
                                    <div class="item-type">${items[item]?.type || 'Предмет'}</div>
                                    <div class="item-description">${items[item]?.description || 'Описание отсутствует'}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `
}; 