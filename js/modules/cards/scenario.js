import { scenarios } from '../../data/scenarios.js';
import { CardFactory } from './cardFactory.js';
import { CardEffectsFactory } from '../effects/cardEffectsFactory.js';
import { calculateScenarioStats } from '../utils/scenarioUtils.js';
import { CardLoaderFactory } from './cardLoaderFactory.js';
import { cardTemplates } from './templates/cardTemplates.js';
import { gameState } from '../../data/gameState.js';

// Фабрика карточек сценариев
class ScenarioCardFactory extends CardFactory {
    constructor() {
        super({
            cardClass: 'scenario-card',
            addEffects: (card, id) => CardEffectsFactory.createScenarioEffects(card, id)
        });
    }

    createCardContent(scenario) {
        try {
            console.log('Создание контента карточки сценария:', scenario.id);
            const stats = calculateScenarioStats(scenario);
            console.log('Рассчитанные характеристики:', stats);
            const content = cardTemplates.scenarioCard(scenario, stats);
            console.log('Контент карточки создан успешно');
            return content;
        } catch (error) {
            console.error('Ошибка при создании контента карточки:', error);
            throw error;
        }
    }
}

// Создание загрузчика сценариев
const scenarioLoader = CardLoaderFactory.createLoaderWithFactory({
    type: 'сценариев',
    containerClass: '.scenarios-wrapper',
    data: scenarios,
    Factory: ScenarioCardFactory
});

// Загрузка сценариев
export function loadScenarios() {
    console.log('Начало загрузки сценариев...');
    console.log('Доступные сценарии:', Object.keys(scenarios));
    
    try {
        const container = document.querySelector('.scenarios-wrapper');
        if (!container) {
            throw new Error('Контейнер для сценариев не найден!');
        }
        
        // Очищаем контейнер перед добавлением карточек
        container.innerHTML = '';
        
        // Создаем карточки для каждого сценария
        Object.entries(scenarios).forEach(([id, scenario], index) => {
            console.log(`Создание карточки для сценария ${id}`);
            
            try {
                const stats = calculateScenarioStats(scenario);
                console.log('Статистика сценария:', stats);
                
                const cardHtml = cardTemplates.scenarioCard(scenario, stats);
                console.log('HTML карточки создан');
                
                // Создаем элемент-обертку для карточки
                const wrapper = document.createElement('div');
                wrapper.innerHTML = cardHtml;
                const card = wrapper.firstElementChild;
                
                // Добавляем задержку анимации
                card.style.animationDelay = `${index * 150}ms`;
                
                // Добавляем эффекты
                console.log('Добавление эффектов для карточки');
                CardEffectsFactory.createScenarioEffects(card, id);
                
                // Добавляем обработчик клика
                card.addEventListener('click', () => {
                    console.log(`Выбран сценарий: ${id}`);
                    // Убираем активный класс у всех карточек
                    document.querySelectorAll('.scenario-card').forEach(c => c.classList.remove('active'));
                    // Добавляем активный класс выбранной карточке
                    card.classList.add('active');
                    // Сохраняем выбранный сценарий
                    gameState.selectedScenario = scenario;
                    // Переходим к выбору персонажа
                    const scenarioSelect = document.getElementById('scenarioSelect');
                    const characterSelect = document.getElementById('characterSelect');
                    if (scenarioSelect && characterSelect) {
                        scenarioSelect.classList.remove('active');
                        characterSelect.classList.add('active');
                    } else {
                        console.error('Элементы экранов не найдены:', { scenarioSelect, characterSelect });
                    }
                });
                
                container.appendChild(card);
                console.log(`Карточка для сценария ${id} добавлена успешно`);
            } catch (error) {
                console.error(`Ошибка при создании карточки для сценария ${id}:`, error);
            }
        });
        
        console.log('Сценарии загружены успешно');
    } catch (error) {
        console.error('Ошибка при загрузке сценариев:', error);
    }
} 