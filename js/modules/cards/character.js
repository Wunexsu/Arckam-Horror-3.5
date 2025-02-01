import { characters } from '../../data/characters.js';
import { CardLoader } from './cardLoader.js';
import { CardFactory } from './cardFactory.js';
import { CardEffectsFactory } from '../effects/cardEffectsFactory.js';

// Фабрика карточек персонажей
class CharacterCardFactory extends CardFactory {
    constructor() {
        super({
            cardClass: 'character-card',
            addEffects: (card, id) => CardEffectsFactory.createCharacterEffects(card, id)
        });
    }

    createCardContent(character) {
        return `
            <div class="character-content">
                <h2 class="character-title">${character.name}</h2>
                <div class="character-role">${character.role}</div>
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-value">${character.stats.will}</div>
                        <div class="stat-name">Воля</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${character.stats.combat}</div>
                        <div class="stat-name">Бой</div>
                    </div>
                    <div class="ability">${character.ability}</div>
                </div>
            </div>
        `;
    }
}

export const characterFactory = new CharacterCardFactory();

// Загрузка карточек персонажей
export function loadCharacters() {
    CardLoader.load({
        type: 'персонажей',
        containerClass: '.characters-wrapper',
        data: characters,
        createCard: characterFactory.createCard
    });
} 