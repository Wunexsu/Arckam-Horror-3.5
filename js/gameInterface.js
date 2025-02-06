// Базовый класс для игровых команд
class GameCommand {
    constructor(controller) {
        this.controller = controller;
    }
    
    execute() {
        if (gameState.actionsLeft < 1) {
            this.controller.showMessage("Не осталось действий!");
            return false;
        }
        
        const result = this.performAction();
        if (result !== false) {
            gameState.actionsLeft--;
            this.controller.updateActionButtons();
        }
        return result;
    }

    performAction() {
        throw new Error('Метод performAction должен быть реализован');
    }
}

// Команда исследования
class InvestigateCommand extends GameCommand {
    performAction() {
        const currentDistrict = gameState.districts[gameState.currentLocation];
        if (currentDistrict.clues > 0) {
            currentDistrict.clues--;
            this.controller.showMessage("Найдена улика!");
            this.controller.updateDistrictView();
            return true;
        } else {
            this.controller.showMessage("Здесь больше нет улик.");
            return false;
        }
    }
}

// Команда начала боя
class CombatCommand extends GameCommand {
    performAction() {
        document.querySelector('.combat-overlay').style.display = 'grid';
        new CombatSystem();
        return true;
    }
}

// Команда отдыха
class RestCommand extends GameCommand {
    performAction() {
        const character = gameState.players[0];
        character.health = Math.min(character.health + 1, character.maxHealth);
        this.controller.showMessage("Восстановлено 1 здоровье");
        this.controller.updateCharacterStatus();
        return true;
    }
}

// Импорты
import { loadCharacters } from './modules/cards/character.js';
import { loadScenarios } from './modules/cards/scenario.js';
import { scenarios } from './data/scenarios.js';
import { characters } from './data/characters.js';
import { gameState } from './data/gameState.js';

class GameController {
    constructor() {
        this.commands = {
            'investigate': new InvestigateCommand(this),
            'combat': new CombatCommand(this),
            'rest': new RestCommand(this)
        };
        this.bindEvents();
        this.setupActionButtons();
    }

    bindEvents() {
        // Обработчики для кнопок действий
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleAction(e.target.dataset.action));
        });

        // Обработчик завершения хода
        document.getElementById('endTurn')?.addEventListener('click', () => this.endTurn());
    }

    setupActionButtons() {
        const actionButtons = {
            investigate: {
                icon: '🔍',
                action: () => this.investigate()
            },
            combat: {
                icon: '⚔',
                action: () => this.startCombat()
            },
            rest: {
                icon: '🕯',
                action: () => this.rest()
            }
        };

        const container = document.querySelector('.action-buttons');
        if (container) {
            container.innerHTML = '';
            Object.entries(actionButtons).forEach(([key, data]) => {
                const button = document.createElement('button');
                button.className = 'action-btn';
                button.dataset.action = key;
                button.innerHTML = data.icon;
                button.addEventListener('click', data.action);
                container.appendChild(button);
            });
        }
    }

    handleAction(action) {
        const command = this.commands[action];
        if (command) {
            command.execute();
        } else {
            console.error(`Неизвестное действие: ${action}`);
        }
    }

    investigate() {
        const currentDistrict = gameState.districts[gameState.currentLocation];
        if (currentDistrict.clues > 0 && gameState.actionsLeft > 0) {
            currentDistrict.clues--;
            gameState.actionsLeft--;
            showMessage("Найдена улика!");
            updateGameInterface();
        } else if (gameState.actionsLeft === 0) {
            showMessage("Не осталось действий!");
        } else {
            showMessage("Здесь больше нет улик.");
        }
    }

    startCombat() {
        if (gameState.actionsLeft > 0) {
            document.querySelector('.combat-overlay').style.display = 'grid';
            new CombatSystem();
            gameState.actionsLeft--;
            updateGameInterface();
        } else {
            showMessage("Не осталось действий!");
        }
    }

    rest() {
        if (gameState.actionsLeft > 0) {
            const character = gameState.players[0];
            const maxHealth = character.stats.health;
            if (character.health < maxHealth) {
                character.health = Math.min(character.health + 1, maxHealth);
                gameState.actionsLeft--;
                showMessage("Восстановлено 1 здоровье");
                updateGameInterface();
            } else {
                showMessage("Здоровье уже максимально");
            }
        } else {
            showMessage("Не осталось действий!");
        }
    }

    endTurn() {
        gameState.actionsLeft = 3;
        updateGameInterface();
        showMessage("Новый ход начался");
    }

    updateDistrictView() {
        const district = gameState.districts[gameState.currentLocation];
        
        // Обновление заголовка
        document.querySelector('.location-title h2').textContent = district.name.toUpperCase();
        
        // Обновление улик
        const clueElements = document.querySelectorAll('.clue');
        clueElements.forEach(el => {
            if (district.clues === 0) {
                el.style.display = 'none';
            }
        });
        
        // Обновление аномалий
        if (district.hasAnomaly) {
            document.querySelector('.portal-anomaly').style.display = 'block';
        } else {
            document.querySelector('.portal-anomaly').style.display = 'none';
        }
    }

    updateCharacterStatus() {
        const character = gameState.players[0];
        document.querySelector('.sanity-tracker .value').textContent = 
            `${character.health}/${character.maxHealth}`;
    }

    showMessage(text) {
        // Создаем элемент сообщения
        const message = document.createElement('div');
        message.className = 'game-message';
        message.textContent = text;
        
        // Добавляем на страницу
        document.body.appendChild(message);
        
        // Удаляем через 3 секунды
        setTimeout(() => {
            message.remove();
        }, 3000);
    }
}

// Стили для сообщений
const style = document.createElement('style');
style.textContent = `
    .game-message {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #1a1426;
        color: #f2d492;
        padding: 15px 30px;
        border: 2px solid #634d32;
        border-radius: 8px;
        animation: messageAppear 0.3s ease-out;
        z-index: 1000;
    }

    @keyframes messageAppear {
        from { 
            opacity: 0;
            transform: translate(-50%, -20px);
        }
        to { 
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
`;
document.head.appendChild(style);

// Функция инициализации игры
export function initializeGame() {
    if (!gameState.selectedScenario || !gameState.selectedCharacter) {
        console.error('Не выбран сценарий или персонаж');
        return;
    }

    // Инициализируем состояние игры
    gameState.currentLocation = gameState.selectedScenario.startArea;
    gameState.actionsLeft = 3;
    gameState.players = [{
        ...gameState.selectedCharacter,
        location: gameState.selectedScenario.startArea,
        isLeader: true,
        health: gameState.selectedCharacter.stats.health,
        sanity: gameState.selectedCharacter.stats.sanity
    }];

    // Инициализируем районы
    gameState.districts = {};
    gameState.selectedScenario.districts.forEach(district => {
        gameState.districts[district.id] = {
            ...district,
            despair: district.initialDespair,
            clues: district.initialClues
        };
    });

    console.log('Игра инициализирована:', gameState);
}

// Функция обновления игрового интерфейса
export function updateGameInterface() {
    // Обновляем информацию о текущей локации
    const currentDistrict = gameState.districts[gameState.currentLocation];
    const locationInfo = document.querySelector('.location-info');
    if (locationInfo && currentDistrict) {
        locationInfo.querySelector('h2').textContent = currentDistrict.name.toUpperCase();
        locationInfo.querySelector('.threat-level').textContent = 
            `Уровень угрозы: ${calculateThreatLevel(currentDistrict.despair)}`;
    }

    // Обновляем статистику персонажа
    const character = gameState.players[0];
    const characterStats = document.querySelector('.character-stats');
    if (characterStats && character) {
        const healthBar = characterStats.querySelector('.health .bar-fill');
        const sanityBar = characterStats.querySelector('.sanity .bar-fill');
        
        const healthPercent = (character.health / character.stats.health) * 100;
        const sanityPercent = (character.sanity / character.stats.sanity) * 100;
        
        healthBar.style.width = `${healthPercent}%`;
        sanityBar.style.width = `${sanityPercent}%`;
        
        healthBar.parentElement.querySelector('.bar-text').textContent = 
            `Здоровье: ${character.health}`;
        sanityBar.parentElement.querySelector('.bar-text').textContent = 
            `Рассудок: ${character.sanity}`;
    }

    // Обновляем доступные пути
    updateAvailablePaths();
}

// Функция обновления доступных путей
function updateAvailablePaths() {
    const currentDistrict = gameState.districts[gameState.currentLocation];
    const navButtons = document.querySelector('.nav-buttons');
    
    if (navButtons && currentDistrict) {
        navButtons.innerHTML = '';
        currentDistrict.connectedTo.forEach(locationId => {
            const district = gameState.districts[locationId];
            const button = document.createElement('button');
            button.className = 'nav-btn';
            button.textContent = `→ ${district.name} (1 действие)`;
            button.addEventListener('click', () => moveToLocation(locationId));
            navButtons.appendChild(button);
        });
    }
}

// Функция перемещения между локациями
function moveToLocation(locationId) {
    if (gameState.actionsLeft > 0) {
        gameState.currentLocation = locationId;
        gameState.actionsLeft--;
        updateGameInterface();
    } else {
        showMessage("Не осталось действий!");
    }
}

// Вспомогательная функция для определения уровня угрозы
function calculateThreatLevel(despair) {
    if (despair >= 5) return "Критический";
    if (despair >= 3) return "Высокий";
    if (despair >= 1) return "Средний";
    return "Низкий";
}

// Функция для переключения экранов
export function showScreen(screenId) {
    // Скрываем все экраны
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Показываем нужный экран
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        console.log(`Переключение на экран: ${screenId}`);
    }
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing game interface...');
    
    // Инициализируем интерфейс
    const gameController = new GameController();
    
    // Показываем экран выбора сценария при загрузке
    showScreen('scenarioSelect');
    
    // Обработчик выбора сценария
    document.addEventListener('scenarioSelected', (event) => {
        const { scenarioId } = event.detail;
        console.log(`Выбран сценарий: ${scenarioId}`);
        gameState.selectedScenario = scenarios[scenarioId];
        showScreen('characterSelect');
        // Загружаем персонажей после выбора сценария
        loadCharacters();
    });

    // Обработчик выбора персонажа
    document.addEventListener('characterSelected', (event) => {
        const { characterId } = event.detail;
        console.log(`Выбран персонаж: ${characterId}`);
        
        // Сохраняем выбранного персонажа
        gameState.selectedCharacter = characters[characterId];
        
        // Показываем кнопку начала игры
        const startGameBtn = document.getElementById('startGameBtn');
        if (startGameBtn) {
            startGameBtn.style.display = 'inline-block';
        }
    });
    
    // Обработчик выбора предмета
    document.addEventListener('itemSelected', (event) => {
        const { characterId, itemName } = event.detail;
        console.log(`Выбран предмет ${itemName} для персонажа ${characterId}`);
    });

    // Обработчик кнопки начала игры
    const startGameBtn = document.getElementById('startGameBtn');
    if (startGameBtn) {
        startGameBtn.addEventListener('click', () => {
            if (gameState.selectedCharacter && gameState.selectedScenario) {
                // Инициализируем игру
                initializeGame();
                
                // Переходим к игровому экрану
                showScreen('gameBoard');
                
                // Обновляем интерфейс
                updateGameInterface();
            } else {
                showMessage("Сначала выберите персонажа!");
            }
        });
    }
});

// Инициализация интерфейса
const gameController = new GameController();

// Класс для управления игровым интерфейсом
class GameInterface {
    constructor(character) {
        this.character = character;
        this.currentHealth = character.stats.health;
        this.currentSanity = character.stats.sanity;
        this.currentLocation = 'square';
        this.logHistory = [];
    }

    // Обновление полосок здоровья и рассудка
    updateBars(health, sanity) {
        const healthBar = document.querySelector('.health .bar-fill');
        const sanityBar = document.querySelector('.sanity .bar-fill');
        const healthText = document.querySelector('.health .bar-text');
        const sanityText = document.querySelector('.sanity .bar-text');

        if (health < this.currentHealth) {
            healthBar.classList.add('decreasing');
            setTimeout(() => healthBar.classList.remove('decreasing'), 300);
        }
        if (sanity < this.currentSanity) {
            sanityBar.classList.add('decreasing');
            setTimeout(() => sanityBar.classList.remove('decreasing'), 300);
        }

        const healthPercent = (health / this.character.stats.health) * 100;
        const sanityPercent = (sanity / this.character.stats.sanity) * 100;

        healthBar.style.width = `${healthPercent}%`;
        sanityBar.style.width = `${sanityPercent}%`;

        healthText.textContent = `${health}/${this.character.stats.health}`;
        sanityText.textContent = `${sanity}/${this.character.stats.sanity}`;

        this.currentHealth = health;
        this.currentSanity = sanity;
    }

    // Добавление записи в журнал
    addLogEntry(text, type = 'system') {
        const logContent = document.querySelector('.log-content');
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.textContent = text;
        
        logContent.appendChild(entry);
        logContent.scrollTop = logContent.scrollHeight;

        this.logHistory.push({ text, type });
        if (this.logHistory.length > 100) {
            this.logHistory.shift();
        }
    }

    // Обработка перемещения
    handleMovement(location) {
        const locationNames = {
            square: 'Центральную площадь',
            outskirts: 'Окраину',
            alga: 'Заводской Альга',
            paiki: 'Пайки',
            alta: 'Альту',
            krichet: 'Кричет Риммы'
        };

        this.addLogEntry(`[Перемещение] Вы направляетесь в ${locationNames[location]}...`, 'movement');
        setTimeout(() => {
            this.currentLocation = location;
            this.addLogEntry(`[Система] Вы находитесь в локации: ${locationNames[location]}`);
        }, 1000);
    }

    // Инициализация обработчиков событий
    initEventListeners() {
        document.querySelectorAll('.location-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const location = btn.dataset.location;
                this.handleMovement(location);
            });
        });
    }
}

// Функция инициализации игрового интерфейса
export function initializeGameInterface(character) {
    const gameInterface = new GameInterface(character);
    gameInterface.initEventListeners();
    
    // Добавляем начальную запись в журнал
    gameInterface.addLogEntry('[Система] Добро пожаловать в игру!');
    gameInterface.addLogEntry(`[Система] Вы играете за персонажа: ${character.name}`);
    
    return gameInterface;
}

// Функция обновления интерфейса
export function updateGameInterface(gameInterface, updates) {
    if (updates.health !== undefined || updates.sanity !== undefined) {
        gameInterface.updateBars(
            updates.health ?? gameInterface.currentHealth,
            updates.sanity ?? gameInterface.currentSanity
        );
    }

    if (updates.logEntry) {
        gameInterface.addLogEntry(updates.logEntry.text, updates.logEntry.type);
    }
} 