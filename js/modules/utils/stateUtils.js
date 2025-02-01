// Утилиты для работы с состоянием

/**
 * Создает новый объект состояния с примененными обновлениями
 * @template T
 * @param {T} currentState - Текущее состояние
 * @param {Partial<T>} updates - Обновления для применения
 * @returns {T} Новое состояние
 */
export function updateState(currentState, updates) {
    return {
        ...currentState,
        ...updates
    };
}

/**
 * Создает функцию для обновления состояния с уведомлением подписчиков
 * @template T
 * @param {T} initialState - Начальное состояние
 * @param {(state: T) => void} [notifyChange] - Функция уведомления об изменениях
 * @returns {[() => T, (updates: Partial<T>) => void]} Кортеж из геттера и сеттера состояния
 */
export function createStateManager(initialState, notifyChange) {
    let state = { ...initialState };

    return [
        // Геттер состояния
        () => state,
        
        // Сеттер состояния
        (updates) => {
            state = updateState(state, updates);
            if (notifyChange) {
                notifyChange(state);
            }
        }
    ];
} 