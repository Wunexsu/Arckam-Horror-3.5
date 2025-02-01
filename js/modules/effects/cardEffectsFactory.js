import { CARD_EFFECTS } from './cardEffects.js';
import { CardEffectsManager } from './CardEffectsManager.js';

// Фабрика эффектов карточек
export class CardEffectsFactory {
    static createEffects(card, type, id) {
        const config = CARD_EFFECTS[type];
        if (!config) {
            console.error(`Неизвестный тип карты: ${type}`);
            return null;
        }

        return new CardEffectsManager(card, {
            ...CARD_EFFECTS.default,
            ...config,
            onClick: () => config.onSelect(id),
            onHover: (element) => {
                element.querySelector(config.highlightSelector)?.classList.add('highlight');
            },
            onLeave: (element) => {
                element.querySelector(config.highlightSelector)?.classList.remove('highlight');
            }
        });
    }

    static createScenarioEffects(card, scenarioId) {
        return this.createEffects(card, 'scenario', scenarioId);
    }

    static createCharacterEffects(card, characterId) {
        return this.createEffects(card, 'character', characterId);
    }
} 