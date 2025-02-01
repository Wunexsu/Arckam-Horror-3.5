import { gameState, gameConfig, resetGameState, startGame } from './data/gameState.js';
import { loadScenarios } from './modules/cards/scenario.js';
import { loadCharacters } from './modules/cards/character.js';
import { CARD_EFFECTS } from './modules/effects/cardEffects.js';
import { CardEffectsManager } from './modules/effects/CardEffectsManager.js';

// Инициализация игры
function initGame() {
    console.log('Инициализация игры...');
    
    // Загрузка сценариев и персонажей
    loadScenarios();
    loadCharacters();
    
    // Обработчики событий
    document.getElementById('mythosModeToggle')?.addEventListener('change', function(e) {
        gameConfig.useModifiedMythos = e.target.checked;
        document.getElementById('mythosModeLabel').textContent = 
            this.checked ? "Расширенная фаза мифов" : "Стандартные правила";
    });

    console.log('Игра инициализирована успешно');
}

// Общая функция для загрузки карточек
function loadCards(options) {
    const {
        type,
        containerClass,
        data,
        createCard
    } = options;

    console.log(`Загрузка ${type}...`);
    const wrapper = document.querySelector(containerClass);
    
    if (!wrapper) {
        console.error(`Ошибка: Не найден контейнер для ${type}`);
        return;
    }

    Object.entries(data).forEach(([key, item], index) => {
        const card = createCard(key, item);
        card.style.animationDelay = `${index * 150}ms`;
        wrapper.appendChild(card);
    });

    console.log(`${type} загружены`);
}

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', initGame);

// Экспорт функций для использования в других модулях
export {
    initGame,
    loadCards,
    CARD_EFFECTS,
    CardEffectsManager
}; 