import { CARD_EFFECTS } from '../cards/base.js';
import { applyHoverStyles, removeHoverStyles } from './styleEffects.js';

// Типы карт и их конфигурация
const CARD_TYPES = {
    SCENARIO: {
        effects: CARD_EFFECTS.scenario,
        highlightSelector: '.scenario-description',
        onSelect: selectScenario
    },
    CHARACTER: {
        effects: CARD_EFFECTS.character,
        highlightSelector: '.character-content',
        onSelect: selectCharacter
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
        applyHoverStyles(this.element, this.effects);
        
        if (this.effects.onHover) {
            this.effects.onHover(this.element);
        }
    }

    resetHoverEffects() {
        removeHoverStyles(this.element, this.effects);
        
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

// Общая функция для добавления эффектов к карточке
export function addCardTypeEffects(card, cardType, id) {
    const config = CARD_TYPES[cardType];
    if (!config) {
        console.error(`Неизвестный тип карты: ${cardType}`);
        return null;
    }

    return addCardEffects(card, {
        ...config.effects,
        onClick: () => config.onSelect(id),
        onHover: (element) => {
            element.querySelector(config.highlightSelector)?.classList.add('highlight');
        },
        onLeave: (element) => {
            element.querySelector(config.highlightSelector)?.classList.remove('highlight');
        }
    });
}

// Добавление эффектов для карточки сценария
export function addScenarioCardEffects(card, scenarioId) {
    return addCardTypeEffects(card, 'SCENARIO', scenarioId);
}

// Добавление эффектов для карточки персонажа
export function addCharacterCardEffects(card, characterId) {
    return addCardTypeEffects(card, 'CHARACTER', characterId);
} 