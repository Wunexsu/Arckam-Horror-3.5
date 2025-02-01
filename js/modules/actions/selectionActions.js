import { scenarios } from '../../data/scenarios.js';
import { characters } from '../../data/characters.js';
import { gameState, startGame } from '../../data/gameState.js';

export function selectScenario(scenarioId) {
    gameState.selectedScenario = scenarios[scenarioId];
    document.getElementById('scenarioSelect').classList.remove('active');
    document.getElementById('characterSelect').classList.add('active');
}

export function selectCharacter(characterId) {
    gameState.selectedCharacter = characters[characterId];
    document.getElementById('characterSelect').classList.remove('active');
    document.getElementById('gameBoard').classList.add('active');
    startGame();
} 