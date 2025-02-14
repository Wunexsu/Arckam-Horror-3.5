import { INITIAL_GAME_STATE, INITIAL_GAME_CONFIG } from './initialState.js';
import { createStateManager } from '../modules/utils/stateUtils.js';

// Начальное состояние игры
const INITIAL_STATE = {
    currentLocation: null,
    actionsLeft: 3,
    mythosPool: [],
    mythosDiscard: [],
    despairTokens: 0,
    currentRoundTokens: 0,
    players: [],
    monsters: [],
    districts: {},
    selectedCharacter: null,
    selectedScenario: null,
    mythosMode: 'standard'
};

// Менеджер состояния игры
export class StateManager {
    constructor() {
        this.state = { ...INITIAL_STATE };
        this.subscribers = new Set();
    }

    // Получение текущего состояния
    getState() {
        return this.state;
    }

    // Обновление состояния
    setState(updates) {
        this.state = {
            ...this.state,
            ...updates
        };
        this.notifySubscribers();
    }

    // Установка сценария
    setScenario(scenario) {
        this.setState({
            selectedScenario: scenario,
            currentLocation: scenario.startArea,
            districts: { ...scenario.districts }
        });
    }

    // Установка персонажа
    setCharacter(character) {
        this.setState({
            selectedCharacter: character
        });
    }

    // Установка режима мифов
    setMythosMode(isModified) {
        this.setState({
            mythosMode: isModified ? 'modified' : 'standard'
        });
        console.log('Режим мифов установлен:', this.state.mythosMode);
    }

    // Сброс состояния
    resetState() {
        this.state = { ...INITIAL_STATE };
        this.notifySubscribers();
    }

    // Подписка на изменения
    subscribe(callback) {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    }

    // Уведомление подписчиков
    notifySubscribers() {
        this.subscribers.forEach(callback => callback(this.state));
    }
}

// Создание единственного экземпляра менеджера состояния
export const gameStateManager = new StateManager(); 