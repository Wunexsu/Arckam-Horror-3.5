import { applyHoverStyles, removeHoverStyles } from './styleEffects.js';

export class CardEffectsManager {
    constructor(element, options = {}, defaultEffects = {}) {
        this.element = element;
        this.effects = {
            ...defaultEffects,
            ...options
        };
        this.bindEvents();
    }

    bindEvents() {
        this.element.addEventListener('mouseover', () => this.applyHoverEffects());
        this.element.addEventListener('mouseout', () => this.resetHoverEffects());
        
        if (this.effects.onClick) {
            this.element.addEventListener('click', this.effects.onClick);
        }
    }

    applyHoverEffects() {
        applyHoverStyles(this.element, this.effects);
        
        if (this.effects.onHover) {
            this.effects.onHover(this.element);
        }
    }

    resetHoverEffects() {
        removeHoverStyles(this.element, this.effects);
        
        if (this.effects.onLeave) {
            this.effects.onLeave(this.element);
        }
    }

    updateEffects(newEffects) {
        this.effects = {
            ...this.effects,
            ...newEffects
        };
    }
} 