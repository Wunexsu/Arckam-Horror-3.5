export const scenarios = {
    azathoth: {
        id: 'azathoth',
        title: 'Пришествие Азатота',
        description: 'Древний бог пробуждается в Аркхэме, и город погружается в безумие. Вам предстоит остановить его пробуждение, пока не стало слишком поздно.',
        image: 'Resource/azathoth-card-bg.webp.jpg',
        difficulty: 'Сложный',
        estimatedTime: '3-4 часа',
        startLocation: 'university',
        districts: {
            university: {
                name: 'Университет Мискатоник',
                description: 'Древнее учебное заведение, хранящее множество тайн',
                clues: 2,
                despair: 1,
                connectedTo: ['station', 'old_well']
            },
            station: {
                name: 'Железнодорожная станция',
                description: 'Место прибытия странных посылок',
                clues: 1,
                despair: 2,
                connectedTo: ['university', 'downtown']
            },
            old_well: {
                name: 'Старый колодец',
                description: 'Заброшенный колодец на окраине города',
                clues: 3,
                despair: 3,
                connectedTo: ['university', 'downtown']
            },
            downtown: {
                name: 'Центр города',
                description: 'Оживленный центр Аркхэма',
                clues: 2,
                despair: 2,
                connectedTo: ['station', 'old_well']
            }
        },
        monsters: {
            cultist: {
                name: 'Культист',
                health: 3,
                damage: 1,
                special: 'Призывает прислужников'
            },
            voidHunter: {
                name: 'Охотник из пустоты',
                health: 5,
                damage: 2,
                special: 'Телепортация'
            }
        },
        anomalies: {
            madnessZone: {
                name: 'Зона безумия',
                description: 'Область, где реальность искажается',
                effect: 'Каждый ход проверка рассудка'
            }
        }
    },
    cthulhu: {
        id: 'cthulhu',
        title: 'Зов Ктулху',
        description: 'В глубинах океана пробуждается Великий Ктулху. Его зов достигает Аркхэма, и жители города начинают видеть странные сны.',
        image: 'Resource/Ктулху2.jpg',
        difficulty: 'Средний',
        estimatedTime: '2-3 часа',
        startLocation: 'port',
        districts: {
            port: {
                name: 'Порт',
                description: 'Туманный порт Аркхэма',
                clues: 3,
                despair: 2,
                connectedTo: ['fishmarket', 'warehouse']
            },
            fishmarket: {
                name: 'Рыбный рынок',
                description: 'Место торговли морепродуктами',
                clues: 2,
                despair: 1,
                connectedTo: ['port', 'downtown']
            },
            warehouse: {
                name: 'Заброшенный склад',
                description: 'Старый портовый склад',
                clues: 1,
                despair: 3,
                connectedTo: ['port', 'downtown']
            },
            downtown: {
                name: 'Центр города',
                description: 'Оживленный центр Аркхэма',
                clues: 2,
                despair: 2,
                connectedTo: ['fishmarket', 'warehouse']
            }
        },
        monsters: {
            deepOne: {
                name: 'Глубоководный',
                health: 4,
                damage: 2,
                special: 'Может атаковать из воды'
            },
            cultist: {
                name: 'Культист Ктулху',
                health: 2,
                damage: 1,
                special: 'Распространяет безумие'
            }
        },
        anomalies: {
            nightmareZone: {
                name: 'Зона кошмаров',
                description: 'Место, где сны становятся реальностью',
                effect: 'Случайные видения каждый ход'
            }
        }
    }
}; 