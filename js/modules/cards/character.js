import { characters } from '../../data/characters.js';
import { addCharacterCardEffects } from './base.js';

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
    console.log('Загрузка персонажей...');
    const wrapper = document.querySelector('.characters-wrapper');
    
    if (!wrapper) {
        console.error('Ошибка: Не найден контейнер для персонажей');
        return;
    }

    Object.entries(characters).forEach(([key, character], index) => {
        const card = createCharacterCard(key, character);
        card.style.animationDelay = `${index * 150}ms`;
        wrapper.appendChild(card);
    });

    console.log('Персонажи загружены');
} 