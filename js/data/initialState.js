// Начальное состояние игры
export const INITIAL_GAME_STATE = {
    // Игровая сессия
    currentLocation: null,
    actionsLeft: 3,
    mythosPool: [],
    mythosDiscard: [],
    despairTokens: 0,
    currentRoundTokens: 0,

    // Игровые сущности
    players: [],
    monsters: [],
    districts: {},

    // Выбранные элементы
    selectedCharacter: null,
    selectedScenario: null
};

// Начальная конфигурация игры
export const INITIAL_GAME_CONFIG = {
    useModifiedMythos: false,
    difficultyLevel: 'normal',
    maxPlayers: 4,
    maxActions: 3
}; 