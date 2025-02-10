import { cardTemplates } from '../templates/cardTemplates.js';
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
            this.element = this.createCard();
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

    createCard() {
        const card = document.createElement('div');
        card.className = 'scenario-card';
        card.dataset.scenario = this.scenario.id;
        card.innerHTML = cardTemplates.scenarioCard(this.scenario);
        return card;
    }

    addEventListeners() {
        this.element.addEventListener('click', (e) => {
            e.preventDefault();
            const allCards = document.querySelectorAll('.scenario-card');
            allCards.forEach(card => card.classList.remove('active'));
            this.element.classList.add('active');
            
            const event = new CustomEvent('scenarioSelected', {
                detail: {
                    scenario: this.scenario,
                    element: this.element
                },
                bubbles: true
            });
            this.element.dispatchEvent(event);
        });
    }

    static loadScenarios(container) {
        if (!container) {
            console.error('Контейнер для сценариев не найден');
            return;
        }

        try {
            // Очищаем контейнер
            container.innerHTML = '';
            
            // Преобразуем объект сценариев в массив
            const scenariosArray = Object.values(scenarios);
            console.log('Доступные сценарии:', scenariosArray);
            
            // Создаем карточки для каждого сценария
            scenariosArray.forEach((scenario, index) => {
                try {
                    const card = new ScenarioCard(scenario);
                    if (card.element) {
                        // Добавляем задержку анимации
                        card.element.style.animationDelay = `${index * 150}ms`;
                        container.appendChild(card.element);
                        console.log('Карточка добавлена в контейнер:', scenario.id);
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