// Общая функция для обработки стилей
function handleStyles(element, styles, isApplying = true) {
    const {
        transform,
        boxShadow,
        classes = []
    } = styles;

    if (transform) {
        element.style.transform = isApplying ? transform : '';
    }
    if (boxShadow) {
        element.style.boxShadow = isApplying ? boxShadow : '';
    }
    if (classes.length) {
        element.classList[isApplying ? 'add' : 'remove'](...classes);
    }
}

// Утилиты для применения стилей
export function applyStyles(element, styles) {
    handleStyles(element, styles, true);
}

// Утилита для удаления стилей
export function removeStyles(element, styles) {
    handleStyles(element, styles, false);
}

// Общая функция для применения эффектов наведения
export function applyHoverEffect(element, effects, isHover = true) {
    const styles = {
        transform: isHover ? effects.transform : effects.resetTransform,
        boxShadow: isHover ? effects.shadow : effects.resetShadow,
        classes: [effects.hoverClass]
    };

    handleStyles(element, styles, isHover);
}

// Функции для конкретных эффектов
export function applyHoverStyles(element, effects) {
    applyHoverEffect(element, effects, true);
}

export function removeHoverStyles(element, effects) {
    applyHoverEffect(element, effects, false);
} 