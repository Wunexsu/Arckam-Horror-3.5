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
        if (!this.container) {
            console.error('Контейнер для персонажей не найден');
            return;
        }

        this.container.innerHTML = characters
            .map(character => cardTemplates.characterCard(character))
            .join('');

        // Добавляем анимацию появления карточек с задержкой
        const cards = this.container.querySelectorAll('.character-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
        });

        // Восстанавливаем выбранные предметы
        this.selectedItems.forEach((itemName, characterId) => {
            const card = this.container.querySelector(`[data-character="${characterId}"]`);
            if (card) {
                const button = card.querySelector(`[data-item="${itemName}"]`);
                if (button) {
                    button.classList.add('selected');
                }
            }
        });
    }

    addEventListeners() {
        if (!this.container) return;

        // Делегирование событий для карточек и предметов
        this.container.addEventListener('click', (e) => {
            const itemButton = e.target.closest('.item-choice');
            if (itemButton) {
                e.stopPropagation();
                const characterCard = itemButton.closest('.character-card');
                if (characterCard) {
                    const characterId = characterCard.dataset.character;
                    const itemName = itemButton.dataset.item;
                    this.selectItem(characterId, itemName, itemButton);
                }
                return;
            }

            const card = e.target.closest('.character-card');
            if (card) {
                const characterId = card.dataset.character;
                this.selectCharacter(characterId);
            }
        });

        // Обработчик двойного клика для раскрытия карточки
        this.container.addEventListener('dblclick', (e) => {
            const card = e.target.closest('.character-card');
            if (card) {
                const characterId = card.dataset.character;
                this.showExpandedCard(characterId);
            }
        });

        // Обработчик клавиши Escape для закрытия раскрытой карточки
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeExpandedCard();
            }
        });
    }

    showExpandedCard(characterId) {
        const character = characters.find(char => char.id === characterId);
        if (!character) return;

        // Удаляем предыдущую раскрытую карточку, если есть
        if (this.expandedCard) {
            this.expandedCard.remove();
        }

        // Создаем новую раскрытую карточку
        const selectedItem = this.selectedItems.get(characterId);
        const expandedCardHTML = cardTemplates.expandedCharacterCard(character, selectedItem);
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = expandedCardHTML;
        this.expandedCard = tempContainer.firstElementChild;

        // Добавляем обработчики событий
        this.expandedCard.querySelector('.close-expanded').addEventListener('click', () => {
            this.closeExpandedCard();
        });

        // Обработчики для выбора предметов
        const equipmentItems = this.expandedCard.querySelectorAll('.equipment-item.selectable');
        equipmentItems.forEach(item => {
            item.addEventListener('click', () => {
                const itemName = item.dataset.item;
                this.selectItem(characterId, itemName, item);
                
                // Обновляем выделение в раскрытой карточке
                equipmentItems.forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
            });
        });

        // Показываем оверлей и карточку
        this.overlay.classList.add('active');
        document.body.appendChild(this.expandedCard);
        this.expandedCard.classList.add('active');
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

    selectCharacter(characterId) {
        const character = characters.find(char => char.id === characterId);
        if (!character) {
            console.error('Персонаж не найден:', characterId);
            return;
        }

        // Убираем выделение с предыдущей карточки
        const previousCard = this.container.querySelector('.character-card.active');
        if (previousCard) {
            previousCard.classList.remove('active');
        }

        // Выделяем новую карточку
        const newCard = this.container.querySelector(`[data-character="${characterId}"]`);
        if (newCard) {
            newCard.classList.add('active');
        }

        this.selectedCharacter = character;
        this.onCharacterSelected(character);
    }

    selectItem(characterId, itemName, element) {
        // Убираем выделение со всех кнопок выбора предметов для этого персонажа
        const container = element.closest('.character-card, .character-card-expanded');
        container.querySelectorAll('.item-choice, .equipment-item.selectable').forEach(btn => {
            btn.classList.remove('selected');
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

        // Обновляем выделение в обычной карточке
        const regularCard = this.container.querySelector(`[data-character="${characterId}"]`);
        if (regularCard) {
            const regularButton = regularCard.querySelector(`[data-item="${itemName}"]`);
            if (regularButton) {
                regularCard.querySelectorAll('.item-choice').forEach(btn => {
                    btn.classList.remove('selected');
                });
                regularButton.classList.add('selected');
            }
        }

        console.log(`Выбран предмет "${itemName}" для персонажа ${characterId}`);
    }

    onCharacterSelected(character) {
        const selectedItem = this.selectedItems.get(character.id);
        
        // Вызываем событие выбора персонажа
        const event = new CustomEvent('characterSelected', {
            detail: { 
                character,
                selectedItem
            }
        });
        document.dispatchEvent(event);

        console.log('Выбран персонаж:', character.name);
        if (selectedItem) {
            console.log('Выбранный предмет:', selectedItem);
        }
    }

    getSelectedCharacter() {
        if (!this.selectedCharacter) return null;
        
        return {
            ...this.selectedCharacter,
            selectedItem: this.selectedItems.get(this.selectedCharacter.id)
        };
    }
} 