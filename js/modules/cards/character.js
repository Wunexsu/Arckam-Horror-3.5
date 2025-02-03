import { characters } from '../../data/characters.js';
import { cardTemplates } from './templates/cardTemplates.js';

let startX;
let scrollLeft;
let isDown;
let container;
let wrapper;

// Функция для создания карточки персонажа
function createCharacterCard(characterId, character) {
    const cardElement = document.createElement('div');
    cardElement.innerHTML = cardTemplates.characterCard(character);
    const card = cardElement.firstElementChild;
    
    // Добавляем обработчики для выбора предметов
    const itemButtons = card.querySelectorAll('.item-choice');
    itemButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
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
        if (!isDown) {
            card.style.transform = 'scale(1.02)';
            card.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.5)';
        }
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

// Функция для инициализации перетаскивания
function initDragScroll() {
    container = document.querySelector('.characters-container');
    wrapper = document.querySelector('.characters-wrapper');
    
    if (!container || !wrapper) return;

    // Добавляем индикаторы прокрутки
    const leftIndicator = document.createElement('div');
    leftIndicator.className = 'scroll-indicator left';
    leftIndicator.innerHTML = '←';
    
    const rightIndicator = document.createElement('div');
    rightIndicator.className = 'scroll-indicator right';
    rightIndicator.innerHTML = '→';
    
    container.appendChild(leftIndicator);
    container.appendChild(rightIndicator);

    // Добавляем точки навигации
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'navigation-dots';
    Object.keys(characters).forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', () => scrollToCard(index));
        dotsContainer.appendChild(dot);
    });
    container.parentElement.appendChild(dotsContainer);

    // Обработчики событий для перетаскивания
    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.style.cursor = 'grabbing';
        startX = e.pageX - wrapper.offsetLeft;
        scrollLeft = wrapper.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.style.cursor = 'grab';
        snapToNearestCard();
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - wrapper.offsetLeft;
        const walk = (x - startX) * 2;
        wrapper.style.transform = `translateX(${-scrollLeft + walk}px)`;
    });

    // Обработчики для индикаторов
    leftIndicator.addEventListener('click', () => scrollToNextCard('left'));
    rightIndicator.addEventListener('click', () => scrollToNextCard('right'));
}

// Функция для прокрутки к следующей карточке
function scrollToNextCard(direction) {
    const cardWidth = 900 + 32; // Ширина карточки + отступ
    const currentScroll = parseInt(wrapper.style.transform.replace('translateX(', '').replace('px)', '') || 0);
    const targetScroll = direction === 'left' ? 
        currentScroll + cardWidth : 
        currentScroll - cardWidth;
    
    wrapper.style.transform = `translateX(${targetScroll}px)`;
    updateNavigationDots(Math.abs(Math.round(targetScroll / cardWidth)));
}

// Функция для прокрутки к конкретной карточке
function scrollToCard(index) {
    const cardWidth = 900 + 32;
    wrapper.style.transform = `translateX(${-index * cardWidth}px)`;
    updateNavigationDots(index);
}

// Функция для обновления точек навигации
function updateNavigationDots(activeIndex) {
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
}

// Функция для привязки к ближайшей карточке после перетаскивания
function snapToNearestCard() {
    const cardWidth = 900 + 32;
    const currentScroll = parseInt(wrapper.style.transform.replace('translateX(', '').replace('px)', '') || 0);
    const nearestCard = Math.round(currentScroll / cardWidth);
    scrollToCard(Math.abs(nearestCard));
}

// Функция загрузки персонажей
export function loadCharacters() {
    console.log('Загрузка персонажей...');
    const container = document.querySelector('.characters-wrapper');
    
    if (!container) {
        console.error('Контейнер для персонажей не найден');
        return;
    }
    
    console.log('Доступные персонажи:', Object.keys(characters));
    
    // Очищаем контейнер
    container.innerHTML = '';
    
    // Создаем карточки для каждого персонажа
    Object.entries(characters).forEach(([id, character], index) => {
        console.log(`Создание карточки для персонажа ${id}:`, character);
        const card = createCharacterCard(id, character);
        card.style.animationDelay = `${index * 150}ms`;
        container.appendChild(card);
    });
    
    // Инициализируем перетаскивание
    initDragScroll();
    
    console.log('Персонажи загружены');
} 