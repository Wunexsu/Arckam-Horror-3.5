import { gameState } from '../../data/gameState.js';

// Менеджер пользовательского интерфейса
export const uiManager = {
    // Обновление кнопок действий
    updateActionButtons() {
        const actionButtons = document.querySelectorAll('.action-btn');
        actionButtons.forEach(button => {
            button.disabled = gameState.actionsLeft < 1;
        });
    },

    // Обновление информации о локации
    updateLocationInfo(district) {
        const locationInfo = document.querySelector('.location-info');
        if (locationInfo) {
            locationInfo.querySelector('h2').textContent = district.name;
            locationInfo.querySelector('.threat-level').textContent = 
                `Уровень угрозы: ${this.calculateThreatLevel(district)}`;
        }
    },

    // Расчет уровня угрозы
    calculateThreatLevel(district) {
        const despairLevel = district.despair || 0;
        if (despairLevel >= 5) return 'Критический';
        if (despairLevel >= 3) return 'Высокий';
        if (despairLevel >= 1) return 'Средний';
        return 'Низкий';
    },

    // Обновление статистики персонажа
    updateCharacterStats(character) {
        const statsContainer = document.querySelector('.character-stats');
        if (statsContainer) {
            const healthBar = statsContainer.querySelector('.health .bar-fill');
            const sanityBar = statsContainer.querySelector('.sanity .bar-fill');
            
            const healthPercent = (character.health / character.maxHealth) * 100;
            const sanityPercent = (character.sanity / character.maxSanity) * 100;
            
            healthBar.style.width = `${healthPercent}%`;
            sanityBar.style.width = `${sanityPercent}%`;
            
            healthBar.parentElement.querySelector('.bar-text').textContent = 
                `Здоровье: ${Math.round(healthPercent)}%`;
            sanityBar.parentElement.querySelector('.bar-text').textContent = 
                `Рассудок: ${Math.round(sanityPercent)}%`;
        }
    },

    // Обновление списка игроков
    updatePlayersList(players) {
        const playersList = document.querySelector('.players-list');
        if (playersList) {
            const playersContainer = playersList.querySelector('.players-container');
            playersContainer.innerHTML = '';
            
            players.forEach(player => {
                const playerElement = document.createElement('div');
                playerElement.className = 'player';
                playerElement.innerHTML = `
                    <span class="player-name">${player.name}</span>
                    <span class="player-health">${Math.round((player.health / player.maxHealth) * 100)}%</span>
                `;
                playersContainer.appendChild(playerElement);
            });
        }
    }
}; 