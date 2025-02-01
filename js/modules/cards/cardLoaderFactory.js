import { CardLoader } from './cardLoader.js';

// Фабрика для создания загрузчиков карточек
export class CardLoaderFactory {
    static createLoader(options) {
        const {
            type,
            containerClass,
            data,
            factory
        } = options;

        return new CardLoader({
            type,
            containerClass,
            data,
            factory
        });
    }

    static createLoaderWithFactory(options) {
        const {
            type,
            containerClass,
            data,
            Factory
        } = options;

        const factory = new Factory();
        return this.createLoader({
            type,
            containerClass,
            data,
            factory
        });
    }
} 