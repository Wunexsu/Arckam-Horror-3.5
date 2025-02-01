// Утилиты для работы со стилями
const StyleProperties = {
    TRANSFORM: 'transform',
    BOX_SHADOW: 'boxShadow'
};

// Применение одиночного стиля
function applyStyleProperty(element, property, value) {
    if (value) {
        element.style[property] = value;
    }
}

// Сброс одиночного стиля
function resetStyleProperty(element, property) {
    element.style[property] = '';
}

// Управление классами
function toggleClasses(element, classes, isAdding) {
    if (classes?.length) {
        element.classList[isAdding ? 'add' : 'remove'](...classes);
    }
}

// Применение стилей к элементу
function handleStyles(element, styles, isApplying = true) {
    const { transform, boxShadow, classes = [] } = styles;

    // Применяем или сбрасываем стили
    const styleHandler = isApplying ? applyStyleProperty : resetStyleProperty;
    
    styleHandler(element, StyleProperties.TRANSFORM, transform);
    styleHandler(element, StyleProperties.BOX_SHADOW, boxShadow);
    toggleClasses(element, classes, isApplying);
}

// Утилиты для применения стилей
export function applyStyles(element, styles) {
    handleStyles(element, styles, true);
}

// Утилита для удаления стилей
export function removeStyles(element, styles) {
    handleStyles(element, styles, false);
}

// Типы эффектов
export const EffectTypes = {
    HOVER: 'hover',
    ACTIVE: 'active',
    DISABLED: 'disabled'
};

// Конфигурация эффектов
const EffectConfig = {
    [EffectTypes.HOVER]: {
        getTransform: (effects) => effects.transform,
        getShadow: (effects) => effects.shadow,
        getClasses: (effects) => [effects.hoverClass],
        getCallback: (effects) => effects.onHover,
        getResetCallback: (effects) => effects.onLeave
    },
    [EffectTypes.ACTIVE]: {
        getTransform: (effects) => effects.activeTransform,
        getShadow: (effects) => effects.activeShadow,
        getClasses: (effects) => [effects.activeClass],
        getCallback: (effects) => effects.onActive,
        getResetCallback: (effects) => effects.onDeactivate
    }
};

// Общая функция для применения эффектов
function applyEffect(element, effects, type, isApplying = true) {
    const config = EffectConfig[type];
    if (!config) return;

    // Получение стилей из конфигурации
    const styles = {
        transform: isApplying ? config.getTransform(effects) : '',
        boxShadow: isApplying ? config.getShadow(effects) : '',
        classes: config.getClasses(effects)
    };

    // Применение стилей
    handleStyles(element, styles, isApplying);

    // Вызов колбэка
    const callback = isApplying 
        ? config.getCallback(effects)
        : config.getResetCallback(effects);
        
    if (callback) {
        callback(element);
    }
}

// Экспортируемые функции
export function applyHoverEffect(element, effects) {
    applyEffect(element, effects, EffectTypes.HOVER, true);
}

export function removeHoverEffect(element, effects) {
    applyEffect(element, effects, EffectTypes.HOVER, false);
}

export function applyActiveEffect(element, effects) {
    applyEffect(element, effects, EffectTypes.ACTIVE, true);
}

export function removeActiveEffect(element, effects) {
    applyEffect(element, effects, EffectTypes.ACTIVE, false);
} 