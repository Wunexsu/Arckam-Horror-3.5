// Базовый класс фабрики карточек
export class CardFactory {
    constructor(options) {
        this.cardClass = options.cardClass;
        this.addEffects = options.addEffects;
    }

    // Создание карточки
    createCard(id, data) {
        const card = document.createElement('div');
        card.className = this.cardClass;
        card.setAttribute('data-id', id);
        
        card.innerHTML = this.createCardContent(data);
        
        if (this.addEffects) {
            this.addEffects(card, id);
        }
        
        return card;
    }

    // Абстрактный метод для создания содержимого карточки
    createCardContent(data) {
        throw new Error('Method createCardContent must be implemented by child class');
    }
} 