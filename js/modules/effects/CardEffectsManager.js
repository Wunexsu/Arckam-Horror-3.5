import { applyHoverEffect, removeHoverEffect, applyActiveEffect, removeActiveEffect, EffectTypes } from './styleEffects.js';
import { createStateManager } from '../utils/stateUtils.js';

export class CardEffectsManager {
    constructor(element, options = {}) {
        this.element = element;
        
        // Создаем менеджеры состояния
        [this.getEffects, this.setEffects] = createStateManager(options);
        [this.getStates, this.setStates] = createStateManager({
            [EffectTypes.HOVER]: false,
            [EffectTypes.ACTIVE]: false
        });

        this.effects = new Set();

        this.bindEvents();
    }

    bindEvents() {
        // Эффекты наведения
        this.element.addEventListener('mouseover', () => this.toggleEffect(EffectTypes.HOVER, true));
        this.element.addEventListener('mouseout', () => this.toggleEffect(EffectTypes.HOVER, false));
        
        // Эффекты клика
        const effects = this.getEffects();
        if (effects.onClick) {
            this.element.addEventListener('click', (e) => {
                this.toggleEffect(EffectTypes.ACTIVE);
                effects.onClick(e);
            });
        }
    }

    toggleEffect(type, force = null) {
        const states = this.getStates();
        
        // Если передано конкретное значение, используем его
        // иначе переключаем текущее состояние
        const newState = force !== null ? force : !states[type];
        
        // Не применяем эффект наведения, если элемент активен
        if (type === EffectTypes.HOVER && states[EffectTypes.ACTIVE]) {
            return;
        }

        // Обновляем состояние
        this.setStates({ [type]: newState });

        // Применяем соответствующий эффект
        const effects = this.getEffects();
        switch (type) {
            case EffectTypes.HOVER:
                if (newState) {
                    applyHoverEffect(this.element, effects);
                } else {
                    removeHoverEffect(this.element, effects);
                }
                break;
            case EffectTypes.ACTIVE:
                if (newState) {
                    applyActiveEffect(this.element, effects);
                } else {
                    removeActiveEffect(this.element, effects);
                }
                break;
        }
    }

    updateEffects(newEffects) {
        this.setEffects(newEffects);
    }

    // Добавление эффекта при наведении
    addHoverEffect() {
        const hoverEffect = {
            onMouseEnter: () => {
                this.element.style.transform = 'translateY(-5px)';
                this.element.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.5)';
            },
            onMouseLeave: () => {
                this.element.style.transform = 'translateY(0)';
                this.element.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
            }
        };

        this.element.addEventListener('mouseenter', hoverEffect.onMouseEnter);
        this.element.addEventListener('mouseleave', hoverEffect.onMouseLeave);
        
        this.effects.add(hoverEffect);
        return this;
    }

    // Добавление эффекта выделения
    addSelectionEffect() {
        const selectionEffect = {
            onClick: () => {
                this.element.classList.toggle('selected');
            }
        };

        this.element.addEventListener('click', selectionEffect.onClick);
        
        this.effects.add(selectionEffect);
        return this;
    }

    // Очистка всех эффектов
    clearEffects() {
        this.effects.clear();
        return this;
    }
} 