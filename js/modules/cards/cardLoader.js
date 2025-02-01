// Базовый загрузчик карточек
export class CardLoader {
    constructor(options) {
        this.type = options.type;
        this.containerClass = options.containerClass;
        this.data = options.data;
        this.factory = options.factory;
    }

    load() {
        console.log(`Загрузка ${this.type}...`);
        const wrapper = document.querySelector(this.containerClass);
        
        if (!wrapper) {
            console.error(`Ошибка: Не найден контейнер для ${this.type}`);
            return;
        }

        Object.entries(this.data).forEach(([id, item], index) => {
            const card = this.factory.createCard(id, item);
            card.style.animationDelay = `${index * 150}ms`;
            wrapper.appendChild(card);
        });

        console.log(`${this.type} загружены`);
    }
} 