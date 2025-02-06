import { cardTemplates } from './templates/cardTemplates.js';
import { scenarios } from '../../data/scenarios.js';

export class ScenarioCard {
    constructor(scenario) {
        console.log('Создание карточки сценария:', scenario?.id);
        
        if (!scenario) {
            console.error('Не удалось создать карточку: сценарий не определен');
            return;
        }

        try {
            this.scenario = scenario;
            this.element = this.createElement();
            this.addEventListeners();
            console.log('Карточка сценария создана успешно:', scenario.id);
        } catch (error) {
            console.error('Ошибка при создании карточки сценария:', error);
        }
    }

    calculateStats() {
        try {
            if (!this.scenario) {
                throw new Error('Сценарий не определен');
            }

            const stats = {
                totalClues: 0,
                totalDespair: 0,
                monstersCount: 0,
                startLocation: this.scenario.startLocation || 'Не указана'
            };

            // Подсчет улик и безысходности
            if (this.scenario.districts) {
                Object.values(this.scenario.districts).forEach(district => {
                    if (district.clues) stats.totalClues += district.clues;
                    if (district.despair) stats.totalDespair += district.despair;
                });
            }

            // Подсчет монстров
            if (this.scenario.monsters) {
                stats.monstersCount = Object.keys(this.scenario.monsters).length;
            }

            console.log('Рассчитаны характеристики сценария:', stats);
            return stats;
        } catch (error) {
            console.error('Ошибка при расчете характеристик сценария:', error);
            return {
                totalClues: 0,
                totalDespair: 0,
                monstersCount: 0,
                startLocation: 'Ошибка'
            };
        }
    }

    createElement() {
        try {
            const card = document.createElement('div');
            card.className = 'scenario-card';
            card.setAttribute('data-scenario', this.scenario.id);
            
            card.innerHTML = `
                <div class="card-content">
                    <div class="scenario-image" style="background-image: url('${this.scenario.image}')"></div>
                    <div class="scenario-overlay">
                        <h3 class="scenario-title">${this.scenario.title}</h3>
                        <p class="scenario-description">${this.scenario.description}</p>
                        <div class="scenario-stats">
                            <div class="stat-box">
                                <div class="stat-label">Сложность</div>
                                <div class="stat-value">${this.scenario.difficulty}</div>
                            </div>
                            <div class="stat-box">
                                <div class="stat-label">Время</div>
                                <div class="stat-value">${this.scenario.estimatedTime}</div>
                            </div>
                        </div>
                        <div class="scenario-details">
                            <div class="scenario-location">Начальная локация: ${this.scenario.startLocation}</div>
                            <div class="scenario-monsters">Монстры: ${Object.keys(this.scenario.monsters).length}</div>
                        </div>
                    </div>
                </div>
            `;
            
            return card;
        } catch (error) {
            console.error('Ошибка при создании элемента карточки:', error);
            return null;
        }
    }

    addEventListeners() {
        try {
            if (!this.element) {
                throw new Error('Элемент карточки не создан');
            }

            this.element.addEventListener('click', () => {
                try {
                    // Убираем активный класс у всех карточек
                    document.querySelectorAll('.scenario-card').forEach(card => {
                        card.classList.remove('active');
                    });
                    
                    // Добавляем активный класс текущей карточке
                    this.element.classList.add('active');
                    
                    // Создаем событие выбора сценария
                    const event = new CustomEvent('scenarioSelected', {
                        detail: { scenario: this.scenario }
                    });
                    document.dispatchEvent(event);
                    
                    console.log('Сценарий выбран:', this.scenario.id);
                } catch (error) {
                    console.error('Ошибка при обработке клика по карточке:', error);
                }
            });

            console.log('Обработчики событий добавлены для карточки:', this.scenario?.id);
        } catch (error) {
            console.error('Ошибка при добавлении обработчиков событий:', error);
        }
    }

    static loadScenarios(container) {
        console.log('Начало загрузки сценариев...');
        
        if (!container) {
            console.error('Контейнер для сценариев не найден');
            return;
        }

        try {
            console.log('Доступные сценарии:', Object.keys(scenarios));
            
            Object.values(scenarios).forEach(scenario => {
                try {
                    const card = new ScenarioCard(scenario);
                    if (card.element) {
                        container.appendChild(card.element);
                        console.log('Карточка добавлена в контейнер:', scenario.id);
                    } else {
                        console.error('Не удалось создать элемент карточки для сценария:', scenario.id);
                    }
                } catch (error) {
                    console.error('Ошибка при создании карточки для сценария:', scenario.id, error);
                }
            });

            console.log('Загрузка сценариев завершена успешно');
        } catch (error) {
            console.error('Ошибка при загрузке сценариев:', error);
        }
    }
} 