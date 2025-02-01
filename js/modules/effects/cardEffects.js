import { selectScenario, selectCharacter } from '../actions/selectionActions.js';

// Константы для эффектов карточек
export const CARD_EFFECTS = {
    default: {
        hoverClass: 'card-hover',
        transform: 'translateY(-5px)',
        shadow: '0 5px 15px rgba(242, 212, 146, 0.3)',
        resetTransform: 'translateY(0)',
        resetShadow: 'none'
    },
    scenario: {
        hoverClass: 'scenario-hover',
        transform: 'translateY(-5px) scale(1.02)',
        shadow: '0 8px 20px rgba(242, 212, 146, 0.4)',
        highlightSelector: '.scenario-description',
        onSelect: selectScenario
    },
    character: {
        hoverClass: 'character-hover',
        transform: 'translateY(-5px) rotate(1deg)',
        shadow: '0 8px 20px rgba(106, 90, 205, 0.3)',
        highlightSelector: '.character-content',
        onSelect: selectCharacter
    }
}; 