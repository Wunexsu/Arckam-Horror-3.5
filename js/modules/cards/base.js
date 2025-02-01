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