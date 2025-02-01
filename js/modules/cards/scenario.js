import { scenarios } from '../../data/scenarios.js';
import { CardFactory } from './cardFactory.js';
import { CardEffectsFactory } from '../effects/cardEffectsFactory.js';
import { calculateScenarioStats } from '../utils/scenarioUtils.js';
import { CardLoaderFactory } from './cardLoaderFactory.js';
import { cardTemplates } from './templates/cardTemplates.js';

// Фабрика карточек сценариев
class ScenarioCardFactory extends CardFactory {
    constructor() {
        super({
            cardClass: 'scenario-card',
            addEffects: (card, id) => CardEffectsFactory.createScenarioEffects(card, id)
        });
    }

    createCardContent(scenario) {
        const stats = calculateScenarioStats(scenario);
        return cardTemplates.scenarioCard(scenario, stats);
    }
}

// Создание загрузчика сценариев
const scenarioLoader = CardLoaderFactory.createLoaderWithFactory({
    type: 'сценариев',
    containerClass: '.scenarios-wrapper',
    data: scenarios,
    Factory: ScenarioCardFactory
});

// Загрузка сценариев
export function loadScenarios() {
    scenarioLoader.load();
} 