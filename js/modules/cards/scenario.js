import { loadCards } from './base.js';
import { addScenarioCardEffects } from '../effects/cardEffects.js';
import { scenarios } from '../../data/scenarios.js';

// Загрузка сценариев
export function loadScenarios() {
    loadCards({
        type: 'сценариев',
        containerClass: '.scenarios-wrapper',
        data: scenarios,
        createCard: createScenarioCard
    });
}

// Создание карточки сценария
export function createScenarioCard(scenarioId, scenario) {
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