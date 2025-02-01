import { selectScenario, selectCharacter } from '../actions/selectionActions.js';

// Общая функция для загрузки карточек
export function loadCards(options) {
    const {
        type,
        containerClass,
        data,
        createCard
    } = options;

    console.log(`Загрузка ${type}...`);
    const wrapper = document.querySelector(containerClass);
    
    if (!wrapper) {
        console.error(`Ошибка: Не найден контейнер для ${type}`);
        return;
    }

    Object.entries(data).forEach(([key, item], index) => {
        const card = createCard(key, item);
        card.style.animationDelay = `${index * 150}ms`;
        wrapper.appendChild(card);
    });

    console.log(`${type} загружены`);
}

// Константы для эффектов карточек
export const CARD_EFFECTS = {
    default: {
        hoverClass: 'card-hover',
        transform: 'translateY(-5px)',
        shadow: '0 5px 15px rgba(242, 212, 146, 0.3)',
        resetTransform: 'translateY(0)',
        resetShadow: 'none'
    },
    scenario: {
        hoverClass: 'scenario-hover',
        transform: 'translateY(-5px) scale(1.02)',
        shadow: '0 8px 20px rgba(242, 212, 146, 0.4)'
    },
    character: {
        hoverClass: 'character-hover',
        transform: 'translateY(-5px) rotate(1deg)',
        shadow: '0 8px 20px rgba(106, 90, 205, 0.3)'
    }
};

// Класс для управления эффектами карточек
export class CardEffectsManager {
    constructor(element, options = {}) {
        this.element = element;
        this.effects = {
            ...CARD_EFFECTS.default,
            ...options
        };
        this.bindEvents();
    }

    bindEvents() {
        this.element.addEventListener('mouseover', () => this.applyHoverEffects());
        this.element.addEventListener('mouseout', () => this.resetHoverEffects());
        
        if (this.effects.onClick) {
            this.element.addEventListener('click', this.effects.onClick);
        }
    }

    applyHoverEffects() {
        this.element.style.transform = this.effects.transform;
        this.element.style.boxShadow = this.effects.shadow;
        this.element.classList.add(this.effects.hoverClass);
        
        if (this.effects.onHover) {
            this.effects.onHover(this.element);
        }
    }

    resetHoverEffects() {
        this.element.style.transform = this.effects.resetTransform;
        this.element.style.boxShadow = this.effects.resetShadow;
        this.element.classList.remove(this.effects.hoverClass);
        
        if (this.effects.onLeave) {
            this.effects.onLeave(this.element);
        }
    }

    updateEffects(newEffects) {
        this.effects = {
            ...this.effects,
            ...newEffects
        };
    }
}

// Функция для добавления эффектов карточек
export function addCardEffects(card, options = {}) {
    return new CardEffectsManager(card, options);
}

// Добавление эффектов для карточки сценария
export function addScenarioCardEffects(card, scenarioId) {
    return addCardEffects(card, {
        ...CARD_EFFECTS.scenario,
        onClick: () => selectScenario(scenarioId),
        onHover: (element) => {
            element.querySelector('.scenario-description')?.classList.add('highlight');
        },
        onLeave: (element) => {
            element.querySelector('.scenario-description')?.classList.remove('highlight');
        }
    });
}

// Добавление эффектов для карточки персонажа
export function addCharacterCardEffects(card, characterId) {
    return addCardEffects(card, {
        ...CARD_EFFECTS.character,
        onClick: () => selectCharacter(characterId),
        onHover: (element) => {
            element.querySelector('.character-content')?.classList.add('highlight');
        },
        onLeave: (element) => {
            element.querySelector('.character-content')?.classList.remove('highlight');
        }
    });
} 