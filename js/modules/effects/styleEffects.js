// Утилиты для применения стилей
export function applyStyles(element, styles) {
    const {
        transform,
        boxShadow,
        classes = []
    } = styles;

    if (transform) element.style.transform = transform;
    if (boxShadow) element.style.boxShadow = boxShadow;
    if (classes.length) element.classList.add(...classes);
}

export function removeStyles(element, styles) {
    const {
        transform,
        boxShadow,
        classes = []
    } = styles;

    if (transform) element.style.transform = '';
    if (boxShadow) element.style.boxShadow = '';
    if (classes.length) element.classList.remove(...classes);
}

// Функции для конкретных эффектов
export function applyHoverStyles(element, effects) {
    applyStyles(element, {
        transform: effects.transform,
        boxShadow: effects.shadow,
        classes: [effects.hoverClass]
    });
}

export function removeHoverStyles(element, effects) {
    applyStyles(element, {
        transform: effects.resetTransform,
        boxShadow: effects.resetShadow,
        classes: [effects.hoverClass]
    });
} 