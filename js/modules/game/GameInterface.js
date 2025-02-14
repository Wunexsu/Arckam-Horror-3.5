import { cardTemplates } from '../cards/templates/cardTemplates.js';
import { locations } from '../../data/locations.js';
import { gameState } from '../../data/gameState.js';

export class GameInterface {
    constructor(character) {
        if (!character) {
            console.error('Character is required for GameInterface');
            return;
        }
        console.log('Initializing GameInterface with character:', character);
        this.character = character;
        this.currentLocation = 'station'; // Начальная локация - станция
    }

    createTemplate() {
        const location = locations[this.currentLocation];
        console.log('Creating game interface template for location:', location);
        
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
                        <h2>${location.name}</h2>
                        <div class="threat-level">Уровень угрозы: Низкий</div>
                    </div>
                </div>
                <div class="game-area">
                    <div class="location-image" style="background-image: url('${location.image}')"></div>
                    <div class="location-description">${location.description}</div>
                </div>
                <div class="bottom-section">
                    <div class="chat-players-container">
                        <div class="chat-area">
                            <div class="chat-messages">
                                <div class="message">Система: Игра началась</div>
                                <div class="message">Система: ${this.character.name} прибывает на ${location.name}</div>
                            </div>
                        </div>
                    </div>
                    <div class="navigation-panel">
                        <div class="nav-buttons">
                            ${this.createNavigationButtons()}
                        </div>
                        <div class="action-buttons">
                            <button class="action-btn" data-action="investigate">🔍</button>
                            <button class="action-btn" data-action="combat">⚔️</button>
                            <button class="action-btn" data-action="rest">📖</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createNavigationButtons() {
        const location = locations[this.currentLocation];
        return location.connectedTo.map(locationId => {
            const connectedLocation = locations[locationId];
            return `<button class="nav-btn" data-location="${locationId}">${connectedLocation.name}</button>`;
        }).join('');
    }

    changeLocation(locationId) {
        console.log('Changing location to:', locationId);
        if (locations[locationId]) {
            this.currentLocation = locationId;
            this.updateLocationInterface();
            this.addMessage(`Вы перешли в локацию: ${locations[locationId].name}`);
        } else {
            console.error('Location not found:', locationId);
        }
    }

    updateLocationInterface() {
        const location = locations[this.currentLocation];
        if (!location) return;

        // Обновляем название локации
        const locationTitle = document.querySelector('.location-info h2');
        if (locationTitle) locationTitle.textContent = location.name;

        // Обновляем изображение локации
        const locationImage = document.querySelector('.location-image');
        if (locationImage) locationImage.style.backgroundImage = `url('${location.image}')`;

        // Обновляем описание локации
        const locationDescription = document.querySelector('.location-description');
        if (locationDescription) locationDescription.textContent = location.description;

        // Обновляем кнопки навигации
        const navButtons = document.querySelector('.nav-buttons');
        if (navButtons) navButtons.innerHTML = this.createNavigationButtons();

        // Переподключаем обработчики событий для новых кнопок
        this.initializeEventListeners();
    }

    addEventListeners(container) {
        console.log('Adding event listeners to game interface');
        this.container = container;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        if (!this.container) return;

        // Обработчики для кнопок навигации
        const navButtons = this.container.querySelectorAll('.nav-btn');
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const locationId = button.dataset.location;
                if (locationId) {
                    this.changeLocation(locationId);
                }
            });
        });

        // Обработчики для кнопок действий
        const actionButtons = this.container.querySelectorAll('.action-btn');
        actionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const action = button.dataset.action;
                if (action) {
                    this.handleAction(action);
                }
            });
        });
    }

    addMessage(text) {
        const chatMessages = this.container.querySelector('.chat-messages');
        if (chatMessages) {
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.textContent = text;
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    handleAction(action) {
        console.log('Handling action:', action);
        switch (action) {
            case 'investigate':
                this.addMessage('Вы начинаете исследование местности...');
                break;
            case 'combat':
                this.addMessage('Приготовьтесь к бою!');
                break;
            case 'rest':
                this.addMessage('Вы решили передохнуть...');
                break;
        }
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

    updateHealth(current, max) {
        const healthBar = this.container.querySelector('.health-bar .bar-fill');
        const healthText = this.container.querySelector('.health-bar .bar-text');
        
        healthBar.style.width = `${(current / max) * 100}%`;
        healthText.textContent = `ХП: ${current}/${max}`;
    }

    updateSanity(current, max) {
        const sanityBar = this.container.querySelector('.energy-bar .bar-fill');
        const sanityText = this.container.querySelector('.energy-bar .bar-text');
        
        sanityBar.style.width = `${(current / max) * 100}%`;
        sanityText.textContent = `Рассудок: ${current}/${max}`;
    }

    unmount() {
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
    }
} 