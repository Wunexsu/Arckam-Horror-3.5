import { scenarios } from './data/scenarios.js';
import { ScenarioCard } from './modules/cards/ScenarioCard.js';
import { CharacterSelection } from './modules/cards/characterSelection.js';
import { GameInterface } from './modules/game/GameInterface.js';
import { StateManager } from './data/stateManager.js';

// Инициализация игры
document.addEventListener('DOMContentLoaded', () => {
    console.log('Инициализация игры...');
    
    // Инициализируем контейнеры
    const scenariosContainer = document.getElementById('scenarios-container');
    const characterSelectionContainer = document.getElementById('character-selection');
    const gameInterfaceContainer = document.getElementById('gameInterface');
    const stateManager = new StateManager();
    
    if (!scenariosContainer || !characterSelectionContainer || !gameInterfaceContainer) {
        console.error('Контейнеры не найдены в DOM:', {
            scenariosContainer,
            characterSelectionContainer,
            gameInterfaceContainer
        });
        return;
    }

    try {
        // Загружаем сценарии
        console.log('Начинаем загрузку сценариев...');
        ScenarioCard.loadScenarios(scenariosContainer);
        
        // Добавляем обработчик выбора сценария
        scenariosContainer.addEventListener('scenarioSelected', (event) => {
            const { scenario } = event.detail;
            console.log('Выбран сценарий:', scenario.title);
            stateManager.setScenario(scenario);
            
            // Показываем экран выбора персонажа
            document.querySelector('.scenario-mode').classList.remove('active');
            document.querySelector('.character-mode').classList.add('active');
            
            // Инициализируем выбор персонажа
            console.log('Инициализация выбора персонажа...');
            const characterSelection = new CharacterSelection(characterSelectionContainer, scenario);
        });

        // Добавляем обработчик начала игры
        document.addEventListener('gameStart', (event) => {
            const { character, selectedItems } = event.detail;
            console.log('Начало игры:', { character, selectedItems });
            
            // Сохраняем выбранного персонажа и его предметы
            stateManager.setCharacter(character);
            stateManager.setSelectedItems(selectedItems);
            
            // Показываем игровой интерфейс
            document.querySelector('.character-mode').classList.remove('active');
            document.querySelector('.game-mode').classList.add('active');
            
            // Инициализируем игровой интерфейс
            const gameInterface = new GameInterface(character);
            gameInterfaceContainer.style.display = 'block';
            gameInterface.mount(gameInterfaceContainer);
        });
        
    } catch (error) {
        console.error('Ошибка при инициализации игры:', error);
    }
}); 