import { INITIAL_GAME_STATE, INITIAL_GAME_CONFIG } from './initialState.js';

// Менеджер состояния игры
class GameStateManager {
    constructor() {
        this.state = { ...INITIAL_GAME_STATE };
        this.config = { ...INITIAL_GAME_CONFIG };
        this.subscribers = new Set();
    }

    // Получение текущего состояния
    getState() {
        return this.state;
    }

    // Получение текущей конфигурации
    getConfig() {
        return this.config;
    }

    // Обновление состояния
    updateState(updates) {
        this.state = {
            ...this.state,
            ...updates
        };
        this.notifySubscribers();
    }

    // Обновление конфигурации
    updateConfig(updates) {
        this.config = {
            ...this.config,
            ...updates
        };
        this.notifySubscribers();
    }

    // Сброс состояния
    resetState() {
        this.state = { ...INITIAL_GAME_STATE };
        this.notifySubscribers();
    }

    // Подписка на изменения
    subscribe(callback) {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    }

    // Уведомление подписчиков
    notifySubscribers() {
        this.subscribers.forEach(callback => callback(this.state, this.config));
    }

    // Инициализация игры
    initGame(scenario) {
        if (!scenario || !this.state.selectedCharacter) {
            console.error('Не выбран сценарий или персонаж');
            return;
        }

        // Инициализация районов
        const districts = {};
        scenario.districts.forEach(district => {
            districts[district.id] = {
                ...district,
                despair: district.initialDespair,
                clues: district.initialClues
            };
        });

        this.updateState({
            currentLocation: scenario.startArea,
            districts,
            players: [{
                ...this.state.selectedCharacter,
                location: scenario.startArea,
                isLeader: true
            }],
            actionsLeft: this.config.maxActions
        });
    }
}

// Создание единственного экземпляра менеджера состояния
export const gameStateManager = new GameStateManager(); 