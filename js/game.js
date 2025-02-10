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
            console.log('Game start event received:', { character, selectedItems });
            
            try {
                // Сохраняем выбранного персонажа
                stateManager.setCharacter(character);
                
                // Скрываем экран выбора персонажа и показываем игровой экран
                const characterMode = document.querySelector('.character-mode');
                const gameMode = document.querySelector('.game-mode');
                
                if (characterMode && gameMode) {
                    // Переключаем экраны
                    characterMode.style.display = 'none';
                    gameMode.style.display = 'flex';
                    
                    // Инициализируем игровой интерфейс
                    console.log('Initializing game interface...');
                    const gameInterface = new GameInterface(character);
                    const gameInterfaceContainer = document.getElementById('gameInterface');
                    
                    if (gameInterfaceContainer) {
                        console.log('Mounting game interface...');
                        gameInterfaceContainer.innerHTML = ''; // Очищаем контейнер
                        gameInterface.mount(gameInterfaceContainer);
                        console.log('Game interface mounted successfully');
                    } else {
                        throw new Error('Game interface container not found');
                    }
                } else {
                    throw new Error('Required screen elements not found');
                }
            } catch (error) {
                console.error('Error starting game:', error);
                // В случае ошибки возвращаемся к выбору персонажа
                const characterMode = document.querySelector('.character-mode');
                if (characterMode) {
                    characterMode.style.display = 'flex';
                }
                alert('Произошла ошибка при запуске игры. Пожалуйста, попробуйте еще раз.');
            }
        });
        
    } catch (error) {
        console.error('Ошибка при инициализации игры:', error);
    }
}); 