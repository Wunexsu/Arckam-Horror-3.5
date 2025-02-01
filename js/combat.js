class CombatSystem {
    constructor() {
        this.currentMonster = null;
        this.playerCharacter = gameState.players[0];
        this.setupCombat();
        this.bindEvents();
    }

    setupCombat() {
        // Создаем монстра для боя
        const monsterType = this.selectRandomMonster();
        this.currentMonster = {
            ...monsters[monsterType],
            currentHealth: monsters[monsterType].health
        };

        // Добавляем начальное сообщение в лог
        this.addLogEntry(`${this.currentMonster.name} появляется перед вами!`);
    }

    bindEvents() {
        document.querySelectorAll('.combat-btn').forEach(btn => {
            btn.addEventListener('click', () => this.handleCombatAction(btn.dataset.action));
        });
    }

    handleCombatAction(action) {
        switch(action) {
            case 'attack':
                this.resolveAttack();
                break;
            case 'dodge':
                this.resolveDodge();
                break;
            case 'spell':
                this.castSpell();
                break;
        }

        // Проверяем состояние боя после каждого действия
        this.checkCombatState();
    }

    resolveAttack() {
        const playerRoll = this.rollDice() + this.playerCharacter.stats.combat;
        const monsterRoll = this.rollDice() + this.currentMonster.attackMod;

        if (playerRoll > monsterRoll) {
            this.currentMonster.currentHealth--;
            this.addLogEntry("Вы наносите урон!", 'player-hit');
            document.querySelector('.combat-overlay').classList.add('damage-effect');
        } else {
            this.playerCharacter.health--;
            this.addLogEntry("Монстр контратакует!", 'monster-hit');
        }

        this.updateHealth();
    }

    resolveDodge() {
        const successRoll = this.rollDice() + this.playerCharacter.stats.agility;
        
        if (successRoll >= 4) {
            this.addLogEntry("Вы успешно уклоняетесь!", 'dodge-success');
            document.querySelector('.combat-overlay').classList.add('dodge-effect');
        } else {
            this.playerCharacter.health--;
            this.addLogEntry("Уклонение не удалось!", 'dodge-fail');
        }

        this.updateHealth();
    }

    castSpell() {
        if (!this.hasAvailableSpells()) {
            this.addLogEntry("У вас нет доступных заклинаний!", 'no-spells');
            return;
        }

        const spell = this.playerCharacter.spells[0];
        const spellResult = this.resolveSpellCast(spell);
        this.applySpellEffects(spellResult, spell);
        this.updateHealth();
    }

    hasAvailableSpells() {
        return this.playerCharacter.spells && this.playerCharacter.spells.length > 0;
    }

    resolveSpellCast(spell) {
        const willCheck = this.rollDice() + this.playerCharacter.stats.will;
        return {
            isSuccess: willCheck >= 4,
            spell: spell
        };
    }

    applySpellEffects(result, spell) {
        if (result.isSuccess) {
            this.applySuccessfulSpell(spell);
        } else {
            this.applyFailedSpell();
        }
    }

    applySuccessfulSpell(spell) {
        this.currentMonster.currentHealth -= 2;
        this.addLogEntry(`Вы успешно применяете ${spell}!`, 'spell-success');
        document.querySelector('.combat-overlay').classList.add('spell-effect');
    }

    applyFailedSpell() {
        if (this.playerCharacter.ability === "Кровавые чары") {
            this.playerCharacter.health--;
            this.addLogEntry("Кровавые чары: получен урон вместо ужаса", 'blood-magic');
        } else {
            this.addLogEntry("Заклинание вышло из-под контроля!", 'spell-fail');
        }
    }

    checkCombatState() {
        if (this.currentMonster.currentHealth <= 0) {
            this.endCombat('victory');
        } else if (this.playerCharacter.health <= 0) {
            this.endCombat('defeat');
        }
    }

    endCombat(result) {
        let message = "";
        
        if (result === 'victory') {
            message = `${this.currentMonster.name} повержен!`;
            // Добавляем награду
            gameState.players[0].clues++;
        } else {
            message = "Вы проиграли бой...";
        }

        this.addLogEntry(message, result);
        
        // Закрываем боевой экран через 2 секунды
        setTimeout(() => {
            document.querySelector('.combat-overlay').style.display = 'none';
        }, 2000);
    }

    updateHealth() {
        // Обновляем здоровье монстра и игрока в интерфейсе
        document.querySelectorAll('.combat-btn').forEach(btn => {
            btn.disabled = this.currentMonster.currentHealth <= 0 || this.playerCharacter.health <= 0;
        });
    }

    addLogEntry(text, className = '') {
        const log = document.querySelector('.combat-log');
        const entry = document.createElement('div');
        entry.className = `log-entry ${className}`;
        entry.textContent = text;
        log.appendChild(entry);
        log.scrollTop = log.scrollHeight;
    }

    rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    selectRandomMonster() {
        const monsterTypes = Object.keys(monsters);
        return monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
    }
}

// Добавляем стили для эффектов боя
const combatStyles = document.createElement('style');
combatStyles.textContent = `
    .log-entry {
        margin: 10px 0;
        padding: 10px;
        background: #1a142666;
        border-left: 3px solid #6a5acd;
        transition: all 0.3s;
    }

    .player-hit { border-left-color: #4a2b69; }
    .monster-hit { border-left-color: #8b0000; }
    .dodge-success { border-left-color: #c0a45e; }
    .dodge-fail { border-left-color: #634d32; }
    .spell-success { border-left-color: #6a5acd; }
    .spell-fail { border-left-color: #8b0000; }
    .blood-magic { border-left-color: #8b0000; background: #8b000033; }
    
    .victory { border-left-color: #c0a45e; background: #c0a45e33; }
    .defeat { border-left-color: #8b0000; background: #8b000033; }
`;
document.head.appendChild(combatStyles); 