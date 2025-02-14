import { scenarios } from './data/scenarios.js';
import { CharacterSelection } from './modules/cards/characterSelection.js';
import { GameInterface } from './modules/game/GameInterface.js';
import { StateManager } from './data/stateManager.js';
import { cardTemplates } from './modules/templates/cardTemplates.js';

// Инициализация игры
document.addEventListener('DOMContentLoaded', () => {
    console.log('Инициализация игры...');
    
    // Инициализируем контейнеры
    const scenariosContainer = document.getElementById('scenarios-container');
    const characterSelectionContainer = document.getElementById('character-selection');
    const gameInterfaceContainer = document.getElementById('gameInterface');
    const mythosToggle = document.getElementById('mythosMode');
    const stateManager = new StateManager();
    
    if (!scenariosContainer || !characterSelectionContainer || !gameInterfaceContainer) {
        console.error('Контейнеры не найдены в DOM:', {
            scenariosContainer,
            characterSelectionContainer,
            gameInterfaceContainer
        });
        return;
    }

    // Инициализируем обработчик переключателя режима мифов
    if (mythosToggle) {
        mythosToggle.addEventListener('change', (event) => {
            const isModified = event.target.checked;
            console.log('Режим мифов изменен:', isModified ? 'Модифицированный' : 'Стандартный');
            stateManager.setMythosMode(isModified);
        });
    }

    try {
        // Загружаем сценарии
        console.log('Доступные сценарии:', scenarios);
        
        // Очищаем контейнер сценариев
        scenariosContainer.innerHTML = '';
        
        // Создаем карточки сценариев
        scenarios.forEach(scenario => {
            console.log('Создаем карточку сценария:', scenario.title);
            console.log('Данные сценария:', {
                title: scenario.title,
                image: scenario.image,
                description: scenario.description
            });
            
            const card = document.createElement('div');
            card.className = 'scenario-card';
            const cardHTML = cardTemplates.scenarioCard(scenario);
            console.log('Сгенерированный HTML карточки:', cardHTML);
            card.innerHTML = cardHTML;
            
            // Добавляем обработчик клика
            card.addEventListener('click', () => {
                console.log('Выбран сценарий:', scenario.title);
                
                // Убираем активный класс у всех карточек
                document.querySelectorAll('.scenario-card').forEach(c => c.classList.remove('active'));
                
                // Добавляем активный класс выбранной карточке
                card.classList.add('active');
                
                // Сохраняем выбранный сценарий
                stateManager.setScenario(scenario);
                
                // Переключаем экраны
                document.querySelector('.scenario-mode').classList.remove('active');
                document.querySelector('.character-mode').classList.add('active');
                
                // Инициализируем выбор персонажа
                console.log('Инициализация выбора персонажа...');
                const characterSelection = new CharacterSelection(characterSelectionContainer, scenario);
            });
            
            scenariosContainer.appendChild(card);
            console.log('Карточка добавлена в контейнер');
        });
        
        console.log('Сценарии успешно загружены');

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
                    gameMode.classList.add('active');
                    
                    // Инициализируем игровой интерфейс
                    console.log('Initializing game interface...');
                    const gameInterface = new GameInterface(character);
                    
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