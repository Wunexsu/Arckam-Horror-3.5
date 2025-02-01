# Arkham Horror - Документация

## 🎮 Обзор проекта
Веб-приложение, реализующее цифровую версию настольной игры Arkham Horror. Построено на современных веб-технологиях с модульной архитектурой.

## 📁 Структура проекта
tree
project_root/
├── css/ # Стили компонентов
├── images/ # Изображения
│ ├── characters/ # Портреты персонажей
│ ├── scenarios/ # Фоны сценариев
│ └── ui/ # Элементы интерфейса
├── js/ # JavaScript код
│ ├── data/ # Данные и состояние
│ └── modules/ # Модули приложения
└── styles/ # Глобальные стили 

## 🔧 Основные компоненты

### 1. Система карточек
- Фабрика карточек (`CardFactory.js`)
- Загрузчик карточек (`cardLoader.js`) 
- Шаблоны карточек (`cardTemplates.js`)
- Поддержка сценариев и персонажей
- Эффекты наведения и активации

### 2. Система эффектов
- Менеджер эффектов (`CardEffectsManager.js`)
- Стилевые эффекты (`styleEffects.js`)
- Определения эффектов (`cardEffects.js`)
- Визуальные эффекты (hover, active)
- Управление состоянием

### 3. Управление состоянием
- Менеджер состояния (`stateManager.js`)
- Глобальное состояние (`gameState.js`)
- Начальные состояния (`initialState.js`)

### 4. Боевая система
- Пошаговые бои
- Система команд
- Логирование действий

## 📚 API

### StateManager 
javascript
// Создание
const [getState, setState] = createStateManager(initialState);
// Использование
setState(updates);
const state = getState(); 

 
javascript
// Создание
const manager = new CardEffectsManager(element, options);
// Методы
manager.toggleEffect(EffectTypes.HOVER);
manager.updateEffects(newEffects);

## 🎨 Стилизация

### Основные классы 
сss
.card-content / Контейнер карточки /
.scenario-card / Карточка сценария /
.character-card / Карточка персонажа /
.scenario-overlay / Оверлей для текста / 

 ##эффекты
css
.card-hover / Эффект наведения /
.card-active / Эффект активации /

##Сервер 
javascript
const mimeTypes = {
'.js': 'text/javascript',
'.css': 'text/css'
}; 

##состояние
javascript
const INITIAL_GAME_STATE = {
currentLocation: null,
actionsLeft: 3
}; 

##расширениеп роекта 
### Новый тип карточек
1. Создать фабрику
2. Добавить шаблон
3. Определить эффекты
4. Обновить стили

### Новый эффект
1. Добавить тип в EffectTypes
2. Создать конфигурацию
3. Реализовать функции
4. Обновить менеджер

## ⚠️ Известные проблемы
1. Отсутствует base.js
2. Проблемы с MIME-типами
3. Использование слова interface

## 📋 TODO
1. Создать модули
2. Исправить сервер
3. Рефакторинг interface
4. Добавить изображения
