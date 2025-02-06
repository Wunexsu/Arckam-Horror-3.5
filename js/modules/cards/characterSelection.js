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

        // Обработчик для кнопки начала игры
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('start-game-btn')) {
                const selectedCharacter = this.getSelectedCharacter();
                if (selectedCharacter) {
                    // Инициализируем состояние игры
                    const gameState = {
                        character: selectedCharacter,
                        health: selectedCharacter.stats.health,
                        sanity: selectedCharacter.stats.sanity,
                        inventory: [...selectedCharacter.defaultItems],
                        location: 'start'
                    };

                    // Если есть выбранный предмет, добавляем его в инвентарь
                    const selectedItem = this.selectedItems.get(selectedCharacter.id);
                    if (selectedItem) {
                        gameState.inventory.push(selectedItem);
                    }

                    // Создаем событие начала игры с данными состояния
                    const gameStartEvent = new CustomEvent('gameStart', {
                        detail: { gameState }
                    });
                    document.dispatchEvent(gameStartEvent);
                    
                    // Закрываем раскрытую карточку, если она открыта
                    this.closeExpandedCard();
                    
                    // Скрываем экран выбора персонажа
                    document.querySelector('.character-mode').classList.remove('active');
                    
                    // Показываем и инициализируем игровой экран
                    const gameScreen = document.querySelector('.game-mode');
                    gameScreen.classList.add('active');

                    // Обновляем интерфейс игры
                    this.initializeGameInterface(selectedCharacter);
                }
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

        // Активируем кнопку "Начать игру"
        if (this.expandedCard) {
            const startGameBtn = this.expandedCard.querySelector('.start-game-btn');
            if (startGameBtn) {
                startGameBtn.disabled = false;
            }
        }

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
        
        // Сохраняем выбранного персонажа
        this.selectedCharacter = character;
        
        // Показываем расширенную карточку для выбора предмета
        this.showExpandedCard(character.id);
        
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

        // Добавляем кнопку "Начать игру" в расширенную карточку
        if (this.expandedCard) {
            const startGameBtn = document.createElement('button');
            startGameBtn.className = 'start-game-btn';
            startGameBtn.textContent = 'Начать игру';
            startGameBtn.disabled = !selectedItem && character.choiceItems?.length > 0; // Кнопка неактивна, если нужно выбрать предмет
            
            startGameBtn.addEventListener('click', () => {
                // Скрываем экран выбора персонажа и расширенную карточку
                this.closeExpandedCard();
                document.querySelector('.character-mode').classList.remove('active');
                
                // Показываем игровой экран
                const gameScreen = document.querySelector('.game-mode');
                gameScreen.classList.add('active');

                // Инициализируем игровой интерфейс
                this.initializeGameInterface(character);
            });

            this.expandedCard.appendChild(startGameBtn);
        }
    }

    getSelectedCharacter() {
        if (!this.selectedCharacter) return null;
        
        return {
            ...this.selectedCharacter,
            selectedItem: this.selectedItems.get(this.selectedCharacter.id)
        };
    }

    // Метод для инициализации игрового интерфейса
    initializeGameInterface(character) {
        // Создаем игровой интерфейс
        const gameScreen = document.querySelector('.game-mode');
        if (!gameScreen) return;

        // Очищаем предыдущий контент
        gameScreen.innerHTML = '';

        // Добавляем новый интерфейс
        const template = cardTemplates.gameInterface(character);
        gameScreen.innerHTML = template;

        // Инициализируем значения здоровья и рассудка
        const healthBar = gameScreen.querySelector('.health .bar-fill');
        const sanityBar = gameScreen.querySelector('.sanity .bar-fill');
        const healthText = gameScreen.querySelector('.health .bar-text');
        const sanityText = gameScreen.querySelector('.sanity .bar-text');

        if (healthBar && healthText) {
            healthBar.style.width = '100%';
            healthText.textContent = `${character.stats.health}/${character.stats.health}`;
        }

        if (sanityBar && sanityText) {
            sanityBar.style.width = '100%';
            sanityText.textContent = `${character.stats.sanity}/${character.stats.sanity}`;
        }

        // Добавляем обработчики событий
        this.addGameInterfaceEventListeners(gameScreen);
    }

    addGameInterfaceEventListeners(gameScreen) {
        // Добавляем обработчики событий для игрового интерфейса
        // ... (реализация метода addGameInterfaceEventListeners)
    }
} 