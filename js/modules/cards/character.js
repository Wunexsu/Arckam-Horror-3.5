import { characters } from '../../data/characters.js';
import { cardTemplates } from './templates/cardTemplates.js';

// Функция для создания карточки персонажа
function createCharacterCard(characterId, character) {
    const cardElement = document.createElement('div');
    cardElement.innerHTML = cardTemplates.characterCard(character);
    const card = cardElement.firstElementChild;
    
    // Добавляем обработчики для выбора предметов
    const itemButtons = card.querySelectorAll('.item-choice');
    itemButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем выделение со всех кнопок
            itemButtons.forEach(btn => btn.classList.remove('selected'));
            // Добавляем выделение на выбранную кнопку
            button.classList.add('selected');
            
            // Создаем событие выбора предмета
            const selectItemEvent = new CustomEvent('itemSelected', {
                detail: {
                    characterId,
                    itemName: button.dataset.item
                }
            });
            document.dispatchEvent(selectItemEvent);
        });
    });
    
    // Добавляем эффекты при наведении
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.02)';
        card.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.5)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
        card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
    });
    
    // Добавляем обработчик клика
    card.addEventListener('click', () => {
        document.querySelectorAll('.character-card').forEach(c => {
            c.classList.remove('active');
        });
        card.classList.add('active');
        
        // Вызываем событие выбора персонажа
        const selectEvent = new CustomEvent('characterSelected', {
            detail: { characterId }
        });
        document.dispatchEvent(selectEvent);
    });
    
    return card;
}

// Функция загрузки персонажей
export function loadCharacters() {
    console.log('Загрузка персонажей...');
    const container = document.querySelector('.characters-wrapper');
    
    if (!container) {
        console.error('Контейнер для персонажей не найден');
        return;
    }
    
    // Очищаем контейнер
    container.innerHTML = '';
    
    // Создаем карточки для каждого персонажа
    Object.entries(characters).forEach(([id, character], index) => {
        const card = createCharacterCard(id, character);
        card.style.animationDelay = `${index * 150}ms`;
        container.appendChild(card);
    });
    
    console.log('Персонажи загружены');
} 