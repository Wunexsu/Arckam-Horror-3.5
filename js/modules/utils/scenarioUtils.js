// Утилиты для работы со сценариями
export function calculateScenarioStats(scenario) {
    return {
        totalClues: scenario.districts.reduce((sum, district) => sum + district.initialClues, 0),
        totalDespair: scenario.districts.reduce((sum, district) => sum + district.initialDespair, 0),
        startLocation: scenario.districts.find(d => d.id === scenario.startArea)?.name || scenario.startArea,
        monstersCount: scenario.monsters ? scenario.monsters.length : 0
    };
} 