// Состояние игры
export const gameState = {
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

// Конфигурация игры
export const gameConfig = {
    useModifiedMythos: false
};

// Функции для работы с состоянием
export function updateGameState(updates) {
    Object.assign(gameState, updates);
}

export function resetGameState() {
    gameState.currentLocation = null;
    gameState.actionsLeft = 3;
    gameState.mythosPool = [];
    gameState.mythosDiscard = [];
    gameState.despairTokens = 0;
    gameState.currentRoundTokens = 0;
    gameState.players = [];
    gameState.monsters = [];
    gameState.districts = {};
    gameState.selectedCharacter = null;
    gameState.selectedScenario = null;
}

// Функция инициализации игры
export function startGame() {
    const scenario = gameState.selectedScenario;
    
    // Инициализация районов
    gameState.districts = {};
    scenario.districts.forEach(district => {
        gameState.districts[district.id] = {
            ...district,
            despair: district.initialDespair,
            clues: district.initialClues
        };
    });
    
    // Установка начальной локации
    gameState.currentLocation = scenario.startArea;
    
    // Инициализация игрока
    gameState.players = [{
        ...gameState.selectedCharacter,
        location: scenario.startArea,
        isLeader: true
    }];
    
    // Обновление интерфейса
    updateGameBoard();
} 