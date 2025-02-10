class ScreenManager {
    constructor() {
        this.currentScreen = null;
        this.screens = {
            scenario: document.querySelector('.scenario-mode'),
            character: document.querySelector('.character-mode'),
            game: document.querySelector('.game-mode')
        };
        this.gameInterface = document.getElementById('gameInterface');
    }

    showScreen(screenName) {
        // Hide current screen if exists
        if (this.currentScreen) {
            this.currentScreen.classList.remove('active');
        }

        // Hide game interface for non-game screens
        if (screenName !== 'game') {
            this.gameInterface.classList.remove('active');
        }

        // Show new screen
        const screen = this.screens[screenName];
        if (screen) {
            screen.classList.add('active');
            this.currentScreen = screen;

            // Show game interface only for game screen
            if (screenName === 'game') {
                this.gameInterface.classList.add('active');
            }
        }
    }
}

export default ScreenManager; 