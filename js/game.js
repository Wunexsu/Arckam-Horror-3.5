// Состояние игры
let gameState = {
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
const gameConfig = {
    useModifiedMythos: false
};

// Инициализация игры
function initGame() {
    console.log('Инициализация игры...');
    
    // Проверяем, что все необходимые данные загружены
    if (!scenarios || !characters) {
        console.error('Ошибка: Не загружены данные сценариев или персонажей');
        return;
    }

    // Загрузка сценариев
    loadScenarios();
    loadCharacters();
    
    // Обработчики событий
    document.getElementById('mythosModeToggle').addEventListener('change', function(e) {
        gameConfig.useModifiedMythos = e.target.checked;
        document.getElementById('mythosModeLabel').textContent = 
            this.checked ? "Расширенная фаза мифов" : "Стандартные правила";
    });

    console.log('Игра инициализирована успешно');
}

// Загрузка сценариев
function loadScenarios() {
    console.log('Загрузка сценариев...');
    const wrapper = document.querySelector('.scenarios-wrapper');
    if (!wrapper) {
        console.error('Ошибка: Не найден контейнер для сценариев');
        return;
    }

    Object.entries(scenarios).forEach(([key, scenario], index) => {
        const card = createScenarioCard(key, scenario);
        card.style.animationDelay = `${index * 150}ms`;
        wrapper.appendChild(card);
    });

    console.log('Сценарии загружены');
}

// Создание карточки сценария
function createScenarioCard(scenarioId, scenario) {
    const card = document.createElement('div');
    card.className = 'scenario-card';
    card.setAttribute('data-scenario', scenarioId);
    
    const scenarioStats = calculateScenarioStats(scenario);
    card.innerHTML = createScenarioCardContent(scenario, scenarioStats);
    
    addScenarioCardEffects(card, scenarioId);
    return card;
}

// Подсчет статистики сценария
function calculateScenarioStats(scenario) {
    return {
        totalClues: scenario.districts.reduce((sum, district) => sum + district.initialClues, 0),
        totalDespair: scenario.districts.reduce((sum, district) => sum + district.initialDespair, 0),
        startLocation: scenario.districts.find(d => d.id === scenario.startArea)?.name || scenario.startArea,
        monstersCount: scenario.monsters ? scenario.monsters.length : 0
    };
}

// Создание содержимого карточки сценария
function createScenarioCardContent(scenario, stats) {
    return `
        <div class="card-content">
            <h3 class="scenario-title">${scenario.title}</h3>
            <div class="scenario-description">${scenario.description}</div>
            <div class="scenario-stats">
                <div class="stat-box">
                    <div class="stat-label">Улики</div>
                    <div class="stat-value">${stats.totalClues}</div>
                </div>
                <div class="stat-box">
                    <div class="stat-label">Безысходность</div>
                    <div class="stat-value">${stats.totalDespair}</div>
                </div>
            </div>
            <div class="scenario-label">
                <div>Начальная локация: ${stats.startLocation}</div>
                <div>Монстры: ${stats.monstersCount}</div>
            </div>
        </div>
    `;
}

// Добавление эффектов для карточки сценария
function addScenarioCardEffects(card, scenarioId) {
    // Эффекты при наведении
    card.addEventListener('mouseover', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 5px 15px rgba(242, 212, 146, 0.3)';
    });
    
    card.addEventListener('mouseout', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
    
    // Обработчик клика
    card.addEventListener('click', () => selectScenario(scenarioId));
}

// Загрузка персонажей
function loadCharacters() {
    console.log('Загрузка персонажей...');
    const wrapper = document.querySelector('.characters-wrapper');
    if (!wrapper) {
        console.error('Ошибка: Не найден контейнер для персонажей');
        return;
    }

    Object.entries(characters).forEach(([key, character], index) => {
        const card = createCharacterCard(key, character);
        card.style.animationDelay = `${index * 150}ms`;
        wrapper.appendChild(card);
    });

    console.log('Персонажи загружены');
}

// Создание карточки персонажа
function createCharacterCard(characterId, character) {
    const card = document.createElement('div');
    card.className = 'character-card';
    card.innerHTML = createCharacterCardContent(character);
    
    addCardHoverEffects(card);
    card.addEventListener('click', () => selectCharacter(characterId));
    
    return card;
}

// Создание содержимого карточки персонажа
function createCharacterCardContent(character) {
    return `
        <div class="character-content">
            <h2 class="character-title">${character.name}</h2>
            <div class="character-role">${character.role}</div>
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-value">${character.stats.will}</div>
                    <div class="stat-name">Воля</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${character.stats.combat}</div>
                    <div class="stat-name">Бой</div>
                </div>
                <div class="ability">${character.ability}</div>
            </div>
        </div>
    `;
}

// Добавление эффектов при наведении на карточку
function addCardHoverEffects(card) {
    card.addEventListener('mouseover', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 5px 15px rgba(242, 212, 146, 0.3)';
    });
    
    card.addEventListener('mouseout', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
}

// Выбор сценария
function selectScenario(scenarioId) {
    gameState.selectedScenario = scenarios[scenarioId];
    document.getElementById('scenarioSelect').classList.remove('active');
    document.getElementById('characterSelect').classList.add('active');
}

// Выбор персонажа
function selectCharacter(characterId) {
    gameState.selectedCharacter = characters[characterId];
    document.getElementById('characterSelect').classList.remove('active');
    document.getElementById('gameBoard').classList.add('active');
    startGame();
}

// Запуск игры
function startGame() {
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

// Обновление игрового поля
function updateGameBoard() {
    const currentDistrict = gameState.districts[gameState.currentLocation];
    
    // Обновление заголовка локации
    document.querySelector('.location-title h2').textContent = currentDistrict.name.toUpperCase();
    
    // Обновление доступных путей
    const pathOptions = document.querySelector('.path-options');
    pathOptions.innerHTML = '<div class="section-title">Доступные пути</div>';
    
    currentDistrict.connectedTo.forEach(pathId => {
        const targetDistrict = gameState.districts[pathId];
        const button = document.createElement('button');
        button.className = 'path-option';
        button.textContent = `➜ ${targetDistrict.name} (1 действие)`;
        button.addEventListener('click', () => moveToLocation(pathId));
        pathOptions.appendChild(button);
    });
    
    // Обновление счетчика действий
    updateActionButtons();
}

// Перемещение
function moveToLocation(locationId) {
    if (gameState.actionsLeft < 1) return;
    
    gameState.currentLocation = locationId;
    gameState.actionsLeft--;
    
    updateGameBoard();
}

// Обновление кнопок действий
function updateActionButtons() {
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.disabled = gameState.actionsLeft < 1;
    });
}

// Фаза мифов
function mythosPhase() {
    if (gameConfig.useModifiedMythos) {
        handleModifiedMythos();
    } else {
        handleStandardMythos();
    }
}

// Стандартная фаза мифов
function handleStandardMythos() {
    const tokens = drawMythosTokens(2);
    tokens.forEach(token => {
        if (token.type === 'despair') {
            addDespairToken('global');
        }
    });
}

// Модифицированная фаза мифов
function handleModifiedMythos() {
    gameState.currentRoundTokens = 0;
    
    const leader = gameState.players.find(p => p.isLeader);
    const otherPlayers = gameState.players.filter(p => !p.isLeader);
    
    leader.mythosTokens = drawMythosTokens(2);
    
    if (otherPlayers.length > 0) {
        otherPlayers[0].mythosTokens = drawMythosTokens(2);
        otherPlayers.slice(1).forEach(player => {
            player.mythosTokens = drawMythosTokens(1);
        });
    }
    
    gameState.players.forEach(player => {
        player.mythosTokens.forEach(token => {
            processMythosToken(token, player);
        });
        player.mythosTokens = [];
    });
}

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', initGame); 