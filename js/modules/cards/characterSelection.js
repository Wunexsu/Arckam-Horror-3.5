import { characters } from './data/characters.js';
import { cardTemplates } from './templates/cardTemplates.js';

export class CharacterSelection {
    constructor() {
        this.selectedCharacter = null;
        this.selectedItems = new Map();
        this.container = document.querySelector('.characters-container');
        this.expandedCard = null;
        this.overlay = this.createOverlay();
        document.body.appendChild(this.overlay);
        this.init();
    }

    createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.addEventListener('click', () => this.closeExpandedCard());
        return overlay;
    }

    init() {
        this.renderCharacters();
        this.addEventListeners();
    }

    renderCharacters() {
        const container = document.querySelector('.characters-container');
        if (!container) return;

        container.innerHTML = '';
        
        Object.entries(characters).forEach(([id, character]) => {
            const card = document.createElement('div');
            card.className = 'character-card';
            card.setAttribute('data-character', id);
            card.innerHTML = cardTemplates.characterCard(character);
            container.appendChild(card);
        });
    }

    addEventListeners() {
        const cards = document.querySelectorAll('.character-card');
        
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const characterId = card.getAttribute('data-character');
                this.selectCharacter(characterId);
            });
        });

        // Обработчики выбора предметов
        document.querySelectorAll('.item-choice').forEach(button => {
            button.addEventListener('click', (e) => {
                const characterId = e.target.closest('.character-card').getAttribute('data-character');
                const itemName = e.target.textContent.trim();
                this.selectItem(characterId, itemName, e.target);
            });
        });
    }

    selectCharacter(characterId) {
        const character = characters[characterId];
        if (!character) return;

        // Убираем выделение со всех карточек
        document.querySelectorAll('.character-card').forEach(card => {
            card.classList.remove('active');
        });

        // Выделяем выбранную карточку
        const selectedCard = document.querySelector(`[data-character="${characterId}"]`);
        if (selectedCard) {
            selectedCard.classList.add('active');
        }

        this.selectedCharacter = character;
        this.onCharacterSelected(character);
    }

    selectItem(characterId, itemName, element) {
        const character = characters[characterId];
        if (!character) return;

        const card = element.closest('.character-card');
        if (!card) return;

        // Убираем выделение со всех предметов в этой карточке
        card.querySelectorAll('.item-choice').forEach(item => {
            item.classList.remove('selected');
        });

        // Выделяем выбранный предмет
        element.classList.add('selected');

        // Сохраняем выбор
        this.selectedItems.set(characterId, itemName);

        // Обновляем состояние персонажа и вызываем событие
        if (this.selectedCharacter && this.selectedCharacter.id === characterId) {
            const updatedCharacter = {
                ...this.selectedCharacter,
                selectedItem: itemName
            };
            this.selectedCharacter = updatedCharacter;
            this.onCharacterSelected(updatedCharacter);
        }

        console.log(`Выбран предмет "${itemName}" для персонажа ${characterId}`);
    }

    onCharacterSelected(character) {
        // Создаем событие выбора персонажа
        const event = new CustomEvent('characterSelected', {
            detail: { character }
        });
        document.dispatchEvent(event);

        console.log('Выбран персонаж:', character.name);
    }

    getSelectedCharacter() {
        return this.selectedCharacter;
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