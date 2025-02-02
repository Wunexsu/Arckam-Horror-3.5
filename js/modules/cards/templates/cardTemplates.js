// Шаблоны для карточек
export const cardTemplates = {
    statBox: (label, value) => `
        <div class="stat-box">
            <div class="stat-label">${label}</div>
            <div class="stat-value">${value}</div>
        </div>
    `,

    statItem: (value, name) => `
        <div class="stat-item">
            <div class="stat-value">${value}</div>
            <div class="stat-name">${name}</div>
        </div>
    `,

    scenarioCard: (scenario, stats) => `
        <div class="scenario-card" data-scenario="${scenario.id}">
            <div class="card-content">
                <div class="scenario-image" style="background-image: url('${scenario.image}')"></div>
                <div class="scenario-overlay">
                    <h3 class="scenario-title">${scenario.title}</h3>
                    <div class="scenario-description">${scenario.description}</div>
                    <div class="scenario-stats">
                        ${cardTemplates.statBox('Улики', stats.totalClues)}
                        ${cardTemplates.statBox('Безысходность', stats.totalDespair)}
                    </div>
                    <div class="scenario-label">
                        <div>Начальная локация: ${stats.startLocation}</div>
                        <div>Монстры: ${stats.monstersCount}</div>
                    </div>
                </div>
            </div>
        </div>
    `,

    characterCard: (character) => `
        <div class="character-card" data-character="${character.id}">
            <div class="character-content">
                <div class="character-portrait" style="background-image: url('images/characters/${character.id}.jpg')"></div>
                <h2 class="character-title">${character.name}</h2>
                <div class="character-role">${character.role}</div>
                <div class="stats-grid">
                    ${cardTemplates.statItem(character.stats.will, 'Воля')}
                    ${cardTemplates.statItem(character.stats.combat, 'Бой')}
                    <div class="ability">${character.ability}</div>
                </div>
            </div>
        </div>
    `
}; 