import { INITIAL_GAME_STATE, INITIAL_GAME_CONFIG } from './initialState.js';
import { createStateManager } from '../modules/utils/stateUtils.js';

// Менеджер состояния игры
class GameStateManager {
    constructor() {
        // Создаем менеджеры состояния с уведомлением подписчиков
        this.subscribers = new Set();
        [this.getState, this.setState] = createStateManager(
            INITIAL_GAME_STATE,
            () => this.notifySubscribers()
        );
        [this.getConfig, this.setConfig] = createStateManager(
            INITIAL_GAME_CONFIG,
            () => this.notifySubscribers()
        );
    }

    // Обновление состояния
    updateState(updates) {
        this.setState(updates);
    }

    // Обновление конфигурации
    updateConfig(updates) {
        this.setConfig(updates);
    }

    // Сброс состояния
    resetState() {
        this.setState(INITIAL_GAME_STATE);
    }

    // Подписка на изменения
    subscribe(callback) {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    }

    // Уведомление подписчиков
    notifySubscribers() {
        const state = this.getState();
        const config = this.getConfig();
        this.subscribers.forEach(callback => callback(state, config));
    }

    // Инициализация игры
    initGame(scenario) {
        const state = this.getState();
        if (!scenario || !state.selectedCharacter) {
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

        const config = this.getConfig();
        this.updateState({
            currentLocation: scenario.startArea,
            districts,
            players: [{
                ...state.selectedCharacter,
                location: scenario.startArea,
                isLeader: true
            }],
            actionsLeft: config.maxActions
        });
    }
}

// Создание единственного экземпляра менеджера состояния
export const gameStateManager = new GameStateManager(); 