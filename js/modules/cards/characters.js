import { characters } from '../../data/characters.js';
import { CardFactory } from './cardFactory.js';
import { CardEffectsFactory } from '../effects/cardEffectsFactory.js';
import { CardLoaderFactory } from './cardLoaderFactory.js';
import { cardTemplates } from './templates/cardTemplates.js';

// Фабрика карточек персонажей
class CharacterCardFactory extends CardFactory {
    constructor() {
        super({
            cardClass: 'character-card',
            addEffects: (card, id) => CardEffectsFactory.createCharacterEffects(card, id)
        });
    }

    createCardContent(character) {
        return cardTemplates.characterCard(character);
    }
}

// Создание загрузчика персонажей
const characterLoader = CardLoaderFactory.createLoaderWithFactory({
    type: 'персонажей',
    containerClass: '.characters-wrapper',
    data: characters,
    Factory: CharacterCardFactory
});

// Загрузка персонажей
export function loadCharacters() {
    characterLoader.load();
} 