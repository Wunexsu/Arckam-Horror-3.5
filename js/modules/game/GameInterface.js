import { cardTemplates } from '../cards/templates/cardTemplates.js';
import { locations } from '../../data/locations.js';

export class GameInterface {
    constructor(character) {
        if (!character) {
            console.error('Character is required for GameInterface');
            return;
        }
        console.log('Initializing GameInterface with character:', character);
        this.character = character;
    }

    createTemplate() {
        console.log('Creating game interface template');
        return `
            <div class="game-container">
                <div class="top-panel">
                    <div class="character-stats">
                        <div class="stat-bar health">
                            <div class="bar-fill" style="width: 100%"></div>
                            <span class="bar-text">Здоровье: ${this.character.stats.health}/${this.character.stats.health}</span>
                        </div>
                        <div class="stat-bar sanity">
                            <div class="bar-fill" style="width: 100%"></div>
                            <span class="bar-text">Рассудок: ${this.character.stats.sanity}/${this.character.stats.sanity}</span>
                        </div>
                    </div>
                    <div class="location-info">
                        <h2>Аркхэм</h2>
                        <div class="threat-level">Уровень угрозы: Низкий</div>
                    </div>
                </div>
                <div class="game-area">
                    <div class="message">Добро пожаловать в Аркхэм, ${this.character.name}!</div>
                </div>
                <div class="bottom-section">
                    <div class="chat-players-container">
                        <div class="chat-area">
                            <div class="chat-messages">
                                <div class="message">Система: Игра началась</div>
                                <div class="message">Система: ${this.character.name} прибывает в Аркхэм</div>
                            </div>
                        </div>
                    </div>
                    <div class="navigation-panel">
                        <div class="nav-buttons">
                            <button class="nav-btn">Исследовать</button>
                            <button class="nav-btn">Инвентарь</button>
                            <button class="nav-btn">Карта</button>
                        </div>
                        <div class="action-buttons">
                            <button class="action-btn">🔍</button>
                            <button class="action-btn">⚔️</button>
                            <button class="action-btn">📖</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    mount(container) {
        if (!container) {
            console.error('Container not found for mounting game interface');
            return;
        }

        console.log('Mounting game interface to container:', container);
        
        try {
            // Создаем шаблон
            const template = this.createTemplate();
            
            // Очищаем контейнер и добавляем новый контент
            container.innerHTML = template;
            
            // Добавляем обработчики событий
            this.addEventListeners(container);
            
            console.log('Game interface mounted successfully');
        } catch (error) {
            console.error('Error mounting game interface:', error);
        }
    }

    addEventListeners(container) {
        console.log('Adding event listeners to game interface');
        
        const navButtons = container.querySelectorAll('.nav-btn');
        const actionButtons = container.querySelectorAll('.action-btn');

        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                console.log('Navigation button clicked:', button.textContent);
                this.handleNavigation(button.textContent);
            });
        });

        actionButtons.forEach(button => {
            button.addEventListener('click', () => {
                console.log('Action button clicked:', button.textContent);
                this.handleAction(button.textContent);
            });
        });
    }

    handleNavigation(action) {
        switch(action) {
            case 'Исследовать':
                this.addMessage('Исследуем текущую локацию...');
                break;
            case 'Инвентарь':
                this.addMessage('Открываем инвентарь...');
                break;
            case 'Карта':
                this.addMessage('Открываем карту...');
                break;
        }
    }

    handleAction(action) {
        switch(action) {
            case '🔍':
                this.addMessage('Осматриваем окрестности...');
                break;
            case '⚔️':
                this.addMessage('Готовимся к бою...');
                break;
            case '📖':
                this.addMessage('Открываем журнал заданий...');
                break;
        }
    }

    addMessage(text) {
        const chatMessages = document.querySelector('.chat-messages');
        if (chatMessages) {
            const message = document.createElement('div');
            message.className = 'message';
            message.textContent = text;
            chatMessages.appendChild(message);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    initialize() {
        // Создаем элемент интерфейса
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = cardTemplates.gameInterfaceTemplate(this.character, this.currentLocation);
        this.element = tempDiv.firstElementChild;

        // Добавляем обработчики событий
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Обработчики для кнопок действий
        const actionButtons = this.element.querySelectorAll('.action-btn');
        actionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const action = button.querySelector('span').textContent;
                this.handleAction(action);
            });
        });

        // Обработчики для кнопок локаций
        const locationButtons = this.element.querySelectorAll('.location-btn');
        locationButtons.forEach(button => {
            button.addEventListener('click', () => {
                const locationId = button.dataset.location;
                this.changeLocation(locationId);
            });
        });

        // Обработчики для кнопок NPC
        const npcButtons = this.element.querySelectorAll('.npc-btn');
        npcButtons.forEach(button => {
            button.addEventListener('click', () => {
                const npc = button.querySelector('span').textContent;
                this.handleNPCInteraction(npc);
            });
        });

        // Обработчики для вкладок
        const tabButtons = this.element.querySelectorAll('.tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.switchTab(button);
            });
        });
    }

    changeLocation(locationId) {
        const newLocation = locations[locationId];
        if (!newLocation) {
            console.error(`Локация ${locationId} не найдена`);
            return;
        }

        // Добавляем класс для анимации
        const locationView = this.element.querySelector('.location-view');
        if (locationView) {
            locationView.classList.add('changing');
        }

        // Обновляем текущую локацию
        this.currentLocation = newLocation;

        // Обновляем интерфейс
        this.updateLocationInterface();

        // Добавляем сообщение в чат
        this.addMessage(`Вы перешли в локацию: ${newLocation.name}`);
    }

    updateLocationInterface() {
        // Обновляем изображение и информацию о локации
        const gameScene = this.element.querySelector('.game-scene');
        gameScene.innerHTML = cardTemplates.locationTemplate(this.currentLocation);

        // Обновляем название локации в верхней панели
        const locationName = this.element.querySelector('.location-name span');
        locationName.textContent = this.currentLocation.name;

        // Обновляем список доступных локаций
        const locationList = this.element.querySelector('.location-list');
        locationList.innerHTML = `
            <h3>Доступные локации</h3>
            ${this.currentLocation.connectedTo.map(locationId => `
                <button class="location-btn" data-location="${locationId}">
                    <div class="icon arrow-icon"></div>
                    <span>${locations[locationId].name}</span>
                </button>
            `).join('')}
        `;

        // Обновляем обработчики событий для новых кнопок
        this.initializeEventListeners();
    }

    handleNPCInteraction(npc) {
        this.addMessage(`Начат диалог с персонажем: ${npc}`);
        // Здесь будет логика взаимодействия с NPC
    }

    switchTab(selectedTab) {
        // Убираем активный класс у всех вкладок
        const tabs = this.element.querySelectorAll('.tab-btn');
        tabs.forEach(tab => tab.classList.remove('active'));
        
        // Добавляем активный класс выбранной вкладке
        selectedTab.classList.add('active');
    }

    updateHealth(current, max) {
        const healthBar = this.element.querySelector('.health-bar .bar-fill');
        const healthText = this.element.querySelector('.health-bar .bar-text');
        
        healthBar.style.width = `${(current / max) * 100}%`;
        healthText.textContent = `ХП: ${current}/${max}`;
    }

    updateSanity(current, max) {
        const sanityBar = this.element.querySelector('.energy-bar .bar-fill');
        const sanityText = this.element.querySelector('.energy-bar .bar-text');
        
        sanityBar.style.width = `${(current / max) * 100}%`;
        sanityText.textContent = `Рассудок: ${current}/${max}`;
    }

    unmount() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
} 