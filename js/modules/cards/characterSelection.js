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
        this.startGameHandler = () => this.startGame();
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
        
        this.addEventListeners();
        this.updateStartGameButton();
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
        
        const previousCard = this.container.querySelector('.character-card.active');
        if (previousCard) {
            previousCard.classList.remove('active');
            this.disableItemChoices(previousCard);
        }

        card.classList.add('active');

        const characterId = card.getAttribute('data-character');
        console.log('Character ID:', characterId);
        this.selectedCharacter = characters[characterId];
        console.log('Selected character:', this.selectedCharacter);

        this.selectedItems.clear();
        this.enableItemChoices(card);
        
        this.updateStartGameButton();
    }

    handleItemSelection(choice) {
        if (!choice.classList.contains('enabled')) {
            return;
        }
        
        console.log('Item choice clicked:', choice);
        
        const previousChoice = choice.parentElement.querySelector('.item-choice.selected');
        if (previousChoice) {
            previousChoice.classList.remove('selected');
            this.selectedItems.delete(previousChoice.getAttribute('data-item'));
        }

        choice.classList.add('selected');
        this.selectedItems.add(choice.getAttribute('data-item'));
        
        console.log('Selected items:', Array.from(this.selectedItems));
        
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
            const canStartGame = this.selectedCharacter && this.selectedItems.size > 0;
            this.startGameBtn.disabled = !canStartGame;
            
            if (canStartGame) {
                this.startGameBtn.classList.add('visible');
                this.startGameBtn.removeEventListener('click', this.startGameHandler);
                this.startGameBtn.addEventListener('click', this.startGameHandler);
            } else {
                this.startGameBtn.classList.remove('visible');
            }
        }
    }

    startGame() {
        if (this.selectedCharacter && this.selectedItems.size > 0) {
            console.log('Starting game with:', {
                character: this.selectedCharacter,
                items: Array.from(this.selectedItems)
            });
            
            const gameStartEvent = new CustomEvent('gameStart', {
                detail: {
                    character: this.selectedCharacter,
                    selectedItems: Array.from(this.selectedItems)
                }
            });
            document.dispatchEvent(gameStartEvent);
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