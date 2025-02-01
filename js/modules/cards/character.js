import { characters } from '../../data/characters.js';
import { addCharacterCardEffects } from './base.js';
import { CardLoader } from './cardLoader.js';

// Создание карточки персонажа
function createCharacterCard(characterId, character) {
    const card = document.createElement('div');
    card.className = 'character-card';
    card.innerHTML = createCharacterCardContent(character);
    
    addCharacterCardEffects(card, characterId);
    
    return card;
}

// Создание содержимого карточки персонажа
function createCharacterCardContent(character) {
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

// Загрузка карточек персонажей
export function loadCharacters() {
    CardLoader.load({
        type: 'персонажей',
        containerClass: '.characters-wrapper',
        data: characters,
        createCard: createCharacterCard
    });
} 