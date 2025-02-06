import { cardTemplates } from '../cards/templates/cardTemplates.js';
import { locations } from '../../data/locations.js';

export class GameInterface {
    constructor(character, startLocation = 'square') {
        this.character = character;
        this.currentLocation = locations[startLocation];
        this.element = null;
        this.initialize();
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

    handleAction(action) {
        switch(action) {
            case 'Исследовать':
                this.investigate();
                break;
            case 'Журнал заданий':
                this.openJournal();
                break;
            default:
                console.log(`Выполняется действие: ${action}`);
        }
    }

    investigate() {
        this.addMessage(`Исследуем локацию: ${this.currentLocation.name}...`);
        // Здесь будет логика исследования локации
    }

    openJournal() {
        this.addMessage('Открыт журнал заданий');
        // Здесь будет логика открытия журнала
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

    addMessage(text) {
        const chatMessages = this.element.querySelector('.chat-messages');
        const message = document.createElement('div');
        message.className = 'message';
        message.textContent = text;
        chatMessages.appendChild(message);
        
        // Прокручиваем чат вниз
        const chatArea = this.element.querySelector('.chat-area');
        chatArea.scrollTop = chatArea.scrollHeight;
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

    mount(container) {
        container.appendChild(this.element);
    }

    unmount() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
} 