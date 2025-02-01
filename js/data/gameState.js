import { gameStateManager } from './stateManager.js';

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
    selectedScenario: null
};

// Экспорт состояния и конфигурации
export const gameState = gameStateManager.getState();
export const gameConfig = gameStateManager.getConfig();

// Функции для работы с состоянием
export function updateGameState(updates) {
    gameStateManager.updateState(updates);
}

export function resetGameState() {
    gameStateManager.resetState();
}

// Функция инициализации игры
export function startGame() {
    const scenario = gameState.selectedScenario;
    if (!scenario) {
        console.error('Не выбран сценарий');
        return;
    }
    
    gameStateManager.initGame(scenario);
} 