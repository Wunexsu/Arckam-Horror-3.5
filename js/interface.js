// Базовый класс для игровых команд
class GameCommand {
    constructor(interface) {
        this.interface = interface;
    }
    
    execute() {
        if (gameState.actionsLeft < 1) {
            this.interface.showMessage("Не осталось действий!");
            return false;
        }
        
        const result = this.performAction();
        if (result !== false) {
            gameState.actionsLeft--;
            this.interface.updateActionButtons();
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
            this.interface.showMessage("Найдена улика!");
            this.interface.updateDistrictView();
            return true;
        } else {
            this.interface.showMessage("Здесь больше нет улик.");
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
        this.interface.showMessage("Восстановлено 1 здоровье");
        this.interface.updateCharacterStatus();
        return true;
    }
}

class EldritchInterface {
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
                icon: '🔍'
            },
            combat: {
                icon: '⚔'
            },
            rest: {
                icon: '🕯'
            }
        };

        document.querySelectorAll('.action-btn').forEach(btn => {
            const action = btn.dataset.action;
            if (actionButtons[action]) {
                btn.innerHTML = actionButtons[action].icon;
            }
        });
    }

    handleAction(action) {
        const command = this.commands[action];
        if (command) {
            command.execute();
        } else {
            console.error(`Неизвестное действие: ${action}`);
        }
    }

    // Общая функция для обновления состояния кнопок действий
    updateActionButtons() {
        const buttons = document.querySelectorAll('.action-btn');
        const disabled = gameState.actionsLeft < 1;
        
        buttons.forEach(btn => {
            btn.disabled = disabled;
            // Добавляем визуальный класс для отключенных кнопок
            if (disabled) {
                btn.classList.add('disabled');
            } else {
                btn.classList.remove('disabled');
            }
        });
    }

    endTurn() {
        gameState.actionsLeft = 3;
        this.updateActionButtons();
        mythosPhase();
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

// Инициализация интерфейса
const gameInterface = new EldritchInterface(); 