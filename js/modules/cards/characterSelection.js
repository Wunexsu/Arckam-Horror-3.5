import { characters } from '../../data/characters.js';
import { cardTemplates } from '../templates/cardTemplates.js';
import { items } from '../../data/items.js';

console.log('Characters imported:', characters);
console.log('Card templates imported:', cardTemplates);
console.log('Items imported:', items);

export class CharacterSelection {
    constructor(container, scenario) {
        if (!container) {
            throw new Error('Container is required for CharacterSelection');
        }
        console.log('CharacterSelection constructor called with container:', container);
        console.log('Scenario:', scenario);
        
        this.selectedCharacter = null;
        this.selectedItems = new Set();
        this.container = container;
        this.scenario = scenario;
        this.expandedCard = null;
        this.overlay = this.createOverlay();
        document.body.appendChild(this.overlay);
        this.startGameBtn = document.querySelector('.start-game-btn');
        this.startGameHandler = this.startGame.bind(this);
        this.initialize();
    }

    createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.addEventListener('click', () => this.closeExpandedCard());
        return overlay;
    }

    initialize() {
        console.log('Initializing CharacterSelection');
        this.container.innerHTML = '';
        this.removeEventListeners();
        
        console.log('Characters data:', characters);
        const charactersArray = Object.values(characters);
        console.log('Available characters:', charactersArray);
        
        charactersArray.forEach(character => {
            console.log('Creating card for character:', character);
            const characterCard = cardTemplates.characterCard(character);
            console.log('Generated HTML:', characterCard);
            this.container.insertAdjacentHTML('beforeend', characterCard);
        });
        
        this.initStartGameButton();
        this.addEventListeners();
    }

    initStartGameButton() {
        if (this.startGameBtn) {
            this.startGameBtn.removeEventListener('click', this.startGameHandler);
            this.startGameBtn.addEventListener('click', this.startGameHandler);
            console.log('Start game button initialized');
        } else {
            console.error('Start game button not found in DOM');
        }
    }

    removeEventListeners() {
        if (this.startGameBtn) {
            this.startGameBtn.removeEventListener('click', this.startGameHandler);
        }
    }

    addEventListeners() {
        console.log('Adding event listeners');
        
        this.container.addEventListener('click', (event) => {
            const characterCard = event.target.closest('.character-card');
            if (characterCard) {
                this.handleCharacterSelection(characterCard);
            }

            const itemChoice = event.target.closest('.item-choice');
            if (itemChoice) {
                this.handleItemSelection(itemChoice);
            }
        });
    }

    handleCharacterSelection(card) {
        console.log('Character card clicked:', card);
        
        const characterId = card.dataset.characterId;
        this.selectedCharacter = characters[characterId];
        
        const previousCard = this.container.querySelector('.character-card.active');
        if (previousCard) {
            previousCard.classList.remove('active');
            this.disableItemChoices(previousCard);
        }
        
        card.classList.add('active');
        this.enableItemChoices(card);
        this.updateStartGameButton();
    }

    handleItemSelection(choice) {
        if (!choice.classList.contains('enabled')) {
            return;
        }
        
        console.log('Item choice clicked:', choice);
        
        const itemChoices = choice.parentElement.querySelectorAll('.item-choice');
        itemChoices.forEach(item => {
            item.classList.remove('selected');
            this.selectedItems.delete(item.dataset.item);
        });

        choice.classList.add('selected');
        const selectedItem = choice.dataset.item;
        if (selectedItem) {
            this.selectedItems.add(selectedItem);
            console.log('Selected items:', Array.from(this.selectedItems));
        } else {
            console.error('No item data found on element:', choice);
        }
        
        this.updateStartGameButton();
    }

    addItemTooltips(card, character) {
        const itemElements = card.querySelectorAll('.default-items li, .item-choice');
        itemElements.forEach(element => {
            const itemName = element.textContent.trim();
            const item = items[itemName];
            if (item) {
                const tooltip = document.createElement('div');
                tooltip.className = 'item-tooltip';
                tooltip.innerHTML = `
                    <div class="item-type">${item.type}</div>
                    <div class="item-description">${item.description}</div>
                `;
                element.appendChild(tooltip);
            }
        });
    }

    enableItemChoices(card) {
        const itemChoices = card.querySelectorAll('.item-choice');
        itemChoices.forEach(choice => {
            choice.classList.add('enabled');
        });
    }

    disableItemChoices(card) {
        const itemChoices = card.querySelectorAll('.item-choice');
        itemChoices.forEach(choice => {
            choice.classList.remove('enabled', 'selected');
        });
    }

    updateStartGameButton() {
        if (this.startGameBtn) {
            const isValid = this.selectedCharacter !== null && this.selectedItems.size > 0;
            this.startGameBtn.disabled = !isValid;
            console.log('Start button state updated:', { 
                isValid, 
                hasCharacter: this.selectedCharacter !== null,
                itemsSelected: this.selectedItems.size,
                disabled: this.startGameBtn.disabled 
            });
        }
    }

    startGame() {
        console.log('Starting game...');
        if (!this.selectedCharacter) {
            console.error('No character selected');
            return;
        }

        if (this.selectedItems.size === 0) {
            console.error('No items selected');
            return;
        }

        try {
            const gameStartEvent = new CustomEvent('gameStart', {
                detail: {
                    character: this.selectedCharacter,
                    selectedItems: Array.from(this.selectedItems)
                },
                bubbles: true
            });
            
            console.log('Dispatching gameStart event:', gameStartEvent.detail);
            document.dispatchEvent(gameStartEvent);
            
            // Переключаем экраны после успешного запуска
            const characterMode = document.querySelector('.character-mode');
            const gameMode = document.querySelector('.game-mode');
            
            if (characterMode && gameMode) {
                characterMode.style.display = 'none';
                gameMode.style.display = 'flex';
                gameMode.classList.add('active');
                console.log('Switched to game mode');
            } else {
                console.error('Game mode elements not found');
            }
        } catch (error) {
            console.error('Error starting game:', error);
        }
    }

    closeExpandedCard() {
        if (this.expandedCard) {
            this.expandedCard.classList.remove('active');
            this.overlay.classList.remove('active');
            setTimeout(() => {
                this.expandedCard.remove();
                this.expandedCard = null;
            }, 300);
        }
    }
} 