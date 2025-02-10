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
        
        this.initStartGameButton();
        this.addEventListeners();
    }

    initStartGameButton() {
        const startButtons = document.querySelectorAll('.start-game-btn');
        startButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Start button clicked, disabled:', btn.disabled);
                if (!btn.disabled) {
                    this.startGame();
                }
            });
        });
    }

    removeEventListeners() {
        const startButtons = document.querySelectorAll('.start-game-btn');
        startButtons.forEach(btn => {
            btn.removeEventListener('click', this.startGameHandler);
        });
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
        
        const itemChoices = choice.parentElement.querySelectorAll('.item-choice');
        itemChoices.forEach(item => {
            item.classList.remove('selected');
            this.selectedItems.delete(item.getAttribute('data-item'));
        });

        choice.classList.add('selected');
        const selectedItem = choice.getAttribute('data-item');
        this.selectedItems.add(selectedItem);
        
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
        const activeCard = document.querySelector('.character-card.active');
        if (activeCard) {
            const startGameContainer = activeCard.querySelector('.start-game-container');
            const startGameBtn = activeCard.querySelector('.start-game-btn');
            
            if (startGameContainer && startGameBtn) {
                const canStartGame = this.selectedCharacter && this.selectedItems.size > 0;
                startGameBtn.disabled = !canStartGame;
                
                if (canStartGame) {
                    startGameContainer.classList.add('visible');
                    console.log('Enabling start game button');
                } else {
                    startGameContainer.classList.remove('visible');
                    console.log('Disabling start game button');
                }
            }
        }
    }

    startGame() {
        console.log('startGame called');
        if (this.selectedCharacter && this.selectedItems.size > 0) {
            console.log('Starting game with:', {
                character: this.selectedCharacter,
                items: Array.from(this.selectedItems)
            });
            
            try {
                const gameStartEvent = new CustomEvent('gameStart', {
                    detail: {
                        character: this.selectedCharacter,
                        selectedItems: Array.from(this.selectedItems)
                    },
                    bubbles: true
                });
                
                document.dispatchEvent(gameStartEvent);
                console.log('Game start event dispatched');
                
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
                console.error('Error in startGame:', error);
            }
        } else {
            console.log('Cannot start game: missing character or items', {
                hasCharacter: !!this.selectedCharacter,
                selectedItems: this.selectedItems.size
            });
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