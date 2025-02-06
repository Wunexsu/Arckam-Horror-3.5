import { scenarios } from './data/scenarios.js';
import { ScenarioCard } from './modules/cards/ScenarioCard.js';
import { CharacterSelection } from './modules/cards/characterSelection.js';
import { GameInterface } from './modules/game/GameInterface.js';

class Game {
    constructor() {
        this.currentScreen = 'scenario';
        this.characterSelection = null;
        this.selectedCharacter = null;
        this.selectedScenario = null;
        this.mythosMode = 'standard';
        this.init();
    }

    init() {
        this.initScreens();
        this.initScenarios();
        this.initCharacterSelection();
        this.addEventListeners();
    }

    initScreens() {
        // Показываем начальный экран
        this.showScreen(this.currentScreen);
    }

    initScenarios() {
        const scenariosContainer = document.querySelector('.scenarios-container');
        if (!scenariosContainer) {
            console.error('Контейнер для сценариев не найден');
            return;
        }

        // Очищаем контейнер
        scenariosContainer.innerHTML = '';

        // Создаем карточки сценариев
        Object.values(scenarios).forEach((scenario, index) => {
            const card = new ScenarioCard(scenario);
            if (card.element) {
                card.element.style.animationDelay = `${index * 150}ms`;
                scenariosContainer.appendChild(card.element);
            }
        });
    }

    initCharacterSelection() {
        // Инициализируем выбор персонажа
        this.characterSelection = new CharacterSelection();
    }

    addEventListeners() {
        // Слушаем выбор персонажа
        document.addEventListener('characterSelected', (e) => {
            this.selectedCharacter = e.detail.character;
            console.log('Выбран персонаж:', this.selectedCharacter.name);
        });

        // Слушаем выбор сценария
        document.addEventListener('scenarioSelected', (e) => {
            this.selectedScenario = e.detail.scenario;
            console.log('Выбран сценарий:', this.selectedScenario.title);
            // После выбора сценария переходим к выбору персонажа
            this.showScreen('character');
        });

        // Слушаем изменение режима мифов
        const mythosToggle = document.getElementById('mythosMode');
        if (mythosToggle) {
            mythosToggle.addEventListener('change', (e) => {
                this.mythosMode = e.target.checked ? 'modified' : 'standard';
                console.log('Выбран режим мифов:', this.mythosMode);
            });
        }
    }

    showScreen(screenName) {
        // Скрываем все экраны
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Показываем нужный экран
        const screen = document.querySelector(`.${screenName}-mode`);
        if (screen) {
            screen.classList.add('active');
            this.currentScreen = screenName;
        }
    }

    startGame() {
        if (!this.selectedCharacter || !this.selectedScenario) {
            console.error('Не выбран персонаж или сценарий');
            return;
        }

        console.log('Начинаем игру:', {
            character: this.selectedCharacter.name,
            scenario: this.selectedScenario.name,
            mythosMode: this.mythosMode
        });

        // Переходим к игровому экрану
        this.showScreen('game');
        // Здесь будет инициализация игрового процесса
    }
}

// Создаем экземпляр игры при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    window.game = new Game();
});

// Инициализация игры
document.addEventListener('DOMContentLoaded', () => {
    console.log('Инициализация игры...');
    
    try {
        // Загрузка сценариев
        const scenariosContainer = document.querySelector('.scenarios-container');
        if (!scenariosContainer) {
            throw new Error('Контейнер для сценариев не найден в DOM');
        }
        
        console.log('Начинаем загрузку сценариев...');
        console.log('Доступные сценарии:', Object.keys(scenarios));
        
        // Создаем карточки для каждого сценария
        Object.values(scenarios).forEach((scenario, index) => {
            try {
                const card = new ScenarioCard(scenario);
                if (card.element) {
                    // Добавляем задержку анимации
                    card.element.style.animationDelay = `${index * 150}ms`;
                    scenariosContainer.appendChild(card.element);
                    console.log('Карточка добавлена в контейнер:', scenario.id);
                }
            } catch (error) {
                console.error(`Ошибка при создании карточки для сценария ${scenario.id}:`, error);
            }
        });

        console.log('Загрузка сценариев завершена');
    } catch (error) {
        console.error('Ошибка при инициализации игры:', error);
    }
});

// Временные данные персонажа для тестирования
const testCharacter = {
    name: "Тестовый персонаж",
    avatar: "character/Agnes.jpg",
    health: {
        current: 7,
        max: 7
    },
    sanity: {
        current: 5,
        max: 5
    }
};

// Инициализация игры
document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    if (!app) {
        console.error('Элемент #app не найден');
        return;
    }

    // Создаем и монтируем игровой интерфейс
    const gameInterface = new GameInterface(testCharacter);
    gameInterface.mount(app);
}); 