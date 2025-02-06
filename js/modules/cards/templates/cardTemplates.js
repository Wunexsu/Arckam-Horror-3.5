import { items } from '../../../data/characters.js';

// Шаблон для предмета с подсказкой
const itemWithTooltip = (itemName) => {
    const item = items[itemName];
    if (!item) return itemName;

    return `
        <div class="item-with-tooltip">
            <span class="item-name">${itemName}</span>
            <div class="item-tooltip">
                <div class="item-type">${item.type || 'Предмет'}</div>
                <div class="item-description">${item.description || 'Описание отсутствует'}</div>
            </div>
        </div>
    `;
};

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
const expandedCharacterCard = (character, selectedItem = null) => {
    // Определяем текст предыстории в зависимости от персонажа
    const storyText = character.id === 'agnes' ? 
        'Издавна Агнес мучили сновидения: люди в мантиях, песнопения, рычащие монстры, которых она видела краем глаза. Однажды она упала и ударилась головой, и с тех пор сны стали приходить к ней наяву: как она руководит пением людей в мантиях, как она прячет серебряный ключ в кладке колодца, как она, будучи волшебницей, творит заклинания в мистической Гиперборее. В поисках объяснения Агнес приехала в Аркхэм, славящийся легендами о судах над ведьмами и другими странными историями. Она устроилась к Вельме и вскоре нашла старый колодец с расшатанной каменной кладкой. За камнем оказался спрятан серебряный ключ - и она точно знала, где его искать.' :
        'В семье Малдунов было несколько поколений полицейских, и Томми не стал исключением. Закончив академию в Бостоне, он стал гордостью своей семьи. Так что, когда Томми назначили в полицию Аркхэма, он расстроился: в конце концов, куда Аркхэму до случаев и расследований большого города, с которыми он бы работал в Бостоне? Однако работа в Аркхэме тоже оказалась по-своему интересной. Дела здесь, очевидно, обстояли странно, и, похоже, местной полиции было проще делать вид, что ничего не происходит, чем исправлять ситуацию. Так что Томми, вооружившись дедушкиным ружьём по прозвищу Бекки, решил действовать в одиночку.';

    return `
    <div class="character-card-expanded">
        <div class="expanded-left-column">
            <div class="expanded-portrait">
                <img src="images/characters/${character.id}.jpg" alt="${character.name}">
            </div>
            <div class="story-title">С чего всё началось</div>
            <div class="story-text">
                ${storyText}
            </div>
        </div>
        <div class="expanded-info">
            <div class="expanded-header">
                <h2 class="expanded-title">${character.name}</h2>
                <div class="expanded-role">${character.role}</div>
            </div>
            
            <div class="expanded-equipment">
                <h3 class="equipment-title">Стартовое снаряжение:</h3>
                <div class="equipment-list">
                    ${character.defaultItems.map(item => expandedItemTemplate(item)).join('')}
                </div>
                
                ${character.choiceItems && character.choiceItems.length > 0 ? `
                    <h3 class="equipment-title">Выберите один предмет:</h3>
                    <div class="equipment-list">
                        ${character.choiceItems.map(item => 
                            expandedItemTemplate(item, true, item === selectedItem)
                        ).join('')}
                    </div>
                ` : ''}
            </div>
            
            <div class="character-abilities">
                <div class="ability-primary">
                    <div class="ability-name">${character.ability.name}</div>
                    <div class="ability-description">${character.ability.description}</div>
                </div>
                ${character.secondaryAbility ? `
                    <div class="ability-secondary">
                        <div class="ability-name">${character.secondaryAbility.name}</div>
                        <div class="ability-description">${character.secondaryAbility.description}</div>
                    </div>
                ` : ''}
            </div>
        </div>
        <button class="close-expanded">×</button>
    </div>
`;
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
                                ${cardTemplates.statBox('Улики', stats?.totalClues || 0)}
                                ${cardTemplates.statBox('Безысходность', stats?.totalDespair || 0)}
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
        if (!character) {
            console.error('Персонаж не определен');
            return '';
        }

        try {
            return `
                <div class="character-wrapper">
                    <div class="character-card" data-character="${character.id}">
                        <div class="character-content">
                            <div class="character-portrait" style="background-image: url('images/characters/${character.id}.jpg')"></div>

                            <div class="character-info">
                                <h3 class="character-name">${character.name}</h3>
                                <div class="character-role">${character.role}</div>
                                
                                <div class="character-stats">
                                    <div class="stat-row">
                                        <div class="stat-icon health"></div>
                                        <div class="stat-value">${character.stats.health}</div>
                                        <div class="stat-icon sanity"></div>
                                        <div class="stat-value">${character.stats.sanity}</div>
                                    </div>
                                    <div class="stat-row">
                                        <div class="stat-icon strength"></div>
                                        <div class="stat-value">${character.stats.strength}</div>
                                        <div class="stat-icon will"></div>
                                        <div class="stat-value">${character.stats.will}</div>
                                    </div>
                                    <div class="stat-row">
                                        <div class="stat-icon observation"></div>
                                        <div class="stat-value">${character.stats.observation}</div>
                                        <div class="stat-icon influence"></div>
                                        <div class="stat-value">${character.stats.influence}</div>
                                    </div>
                                </div>

                                ${character.quote ? `
                                    <div class="character-quote">"${character.quote}"</div>
                                ` : ''}

                                <div class="character-abilities">
                                    <div class="ability-primary">
                                        <div class="ability-name">${character.ability.name}</div>
                                        <div class="ability-description">${character.ability.description}</div>
                                    </div>
                                    ${character.secondaryAbility ? `
                                        <div class="ability-secondary">
                                            <div class="ability-name">${character.secondaryAbility.name}</div>
                                            <div class="ability-description">${character.secondaryAbility.description}</div>
                                        </div>
                                    ` : ''}
                                </div>

                                <div class="character-items">
                                    <div class="items-title">Стартовое снаряжение:</div>
                                    <ul class="items-list">
                                        ${character.defaultItems.map(item => `
                                            <li>${itemWithTooltip(item)}</li>
                                        `).join('')}
                                    </ul>
                                    ${character.choiceItems && character.choiceItems.length > 0 ? `
                                        <div class="items-title">Выберите один предмет:</div>
                                        <div class="item-choices">
                                            ${character.choiceItems.map(item => `
                                                <button type="button" class="item-choice" data-item="${item}">
                                                    ${itemWithTooltip(item)}
                                                </button>
                                            `).join('')}
                                        </div>
                                    ` : ''}
                                </div>
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

    expandedCharacterCard
}; 