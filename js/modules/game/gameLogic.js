import { gameState, gameConfig } from '../../data/gameState.js';
import { uiManager } from '../ui/uiManager.js';

// Обновление игрового поля
export function updateGameBoard() {
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
    
    // Обновление состояния кнопок действий
    uiManager.updateActionButtons();
}

// Перемещение
export function moveToLocation(locationId) {
    if (gameState.actionsLeft < 1) return;
    
    gameState.currentLocation = locationId;
    gameState.actionsLeft--;
    
    updateGameBoard();
}

// Фаза мифов
export function mythosPhase() {
    if (gameConfig.useModifiedMythos) {
        handleModifiedMythos();
    } else {
        handleStandardMythos();
    }
    
    uiManager.updateActionButtons();
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