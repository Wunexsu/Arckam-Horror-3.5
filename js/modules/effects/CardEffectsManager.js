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
} 