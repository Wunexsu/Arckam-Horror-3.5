// Базовые функции для работы с карточками
import { CardEffectsManager } from '../effects/CardEffectsManager.js';

// Функция для добавления эффектов к карточке персонажа
export function addCharacterCardEffects(card, characterId) {
    const manager = new CardEffectsManager(card);
    
    // Добавляем базовые эффекты наведения
    manager.addHoverEffect();
    
    // Добавляем эффект выбора персонажа
    card.addEventListener('click', () => {
        // Убираем активный класс у всех карточек
        document.querySelectorAll('.character-card').forEach(c => {
            c.classList.remove('active');
        });
        
        // Добавляем активный класс текущей карточке
        card.classList.add('active');
        
        // Вызываем событие выбора персонажа
        const selectEvent = new CustomEvent('characterSelected', {
            detail: { characterId }
        });
        document.dispatchEvent(selectEvent);
    });
    
    return manager;
} 