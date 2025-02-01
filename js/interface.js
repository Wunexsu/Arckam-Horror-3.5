class EldritchInterface {
    constructor() {
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
                handler: () => this.investigate()
            },
            combat: {
                icon: '⚔',
                handler: () => this.startCombat()
            },
            rest: {
                icon: '🕯',
                handler: () => this.rest()
            }
        };

        document.querySelectorAll('.action-btn').forEach(btn => {
            const action = btn.dataset.action;
            if (actionButtons[action]) {
                btn.innerHTML = actionButtons[action].icon;
                btn.addEventListener('click', actionButtons[action].handler);
            }
        });
    }

    handleAction(action) {
        if (gameState.actionsLeft < 1) {
            this.showMessage("Не осталось действий!");
            return;
        }

        switch(action) {
            case 'investigate':
                this.investigate();
                break;
            case 'combat':
                this.startCombat();
                break;
            case 'rest':
                this.rest();
                break;
        }

        gameState.actionsLeft--;
        this.updateActionCounter();
    }

    investigate() {
        const currentDistrict = gameState.districts[gameState.currentLocation];
        if (currentDistrict.clues > 0) {
            currentDistrict.clues--;
            this.showMessage("Найдена улика!");
            this.updateDistrictView();
        } else {
            this.showMessage("Здесь больше нет улик.");
        }
    }

    startCombat() {
        document.querySelector('.combat-overlay').style.display = 'grid';
        new CombatSystem();
    }

    rest() {
        const character = gameState.players[0];
        character.health = Math.min(character.health + 1, character.maxHealth);
        this.showMessage("Восстановлено 1 здоровье");
        this.updateCharacterStatus();
    }

    endTurn() {
        gameState.actionsLeft = 3;
        this.updateActionCounter();
        mythosPhase();
    }

    updateActionCounter() {
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.disabled = gameState.actionsLeft < 1;
        });
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