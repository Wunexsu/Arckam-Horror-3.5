// Данные сценариев
const scenarios = [
    {
        id: "azathoth",
        title: "Пришествие Азатота",
        description: "Древний бог пробуждается в Аркхэме, и его безумное присутствие угрожает разорвать саму ткань реальности. Вы должны остановить его пробуждение, пока не стало слишком поздно.",
        image: "Resource/azathoth-card-bg.webp.jpg",
        startArea: "station",
        difficulty: "Средняя",
        estimatedTime: "2-3 часа",
        districts: {
            station: {
                id: "station",
                name: "Вокзал",
                initialClues: 2,
                initialDespair: 0,
                connectedTo: ["square", "port", "shop"]
            },
            square: {
                id: "square",
                name: "Площадь независимости",
                initialClues: 1,
                initialDespair: 1,
                connectedTo: ["station", "newspaper", "diner", "shop"]
            },
            shop: {
                id: "shop",
                name: "Магазин",
                initialClues: 0,
                initialDespair: 2,
                hasAnomaly: true,
                connectedTo: ["square", "station", "curiosity"]
            }
        },
        monsters: {
            blindWatcher: {
                name: "Безглазый наблюдатель",
                health: 4,
                damage: 2,
                special: "Неуязвимость к физическому оружию"
            },
            houndOfTindalos: {
                name: "Псы Тиндалоса",
                health: 3,
                damage: 1,
                special: "Телепортация через углы"
            },
            voidHunter: {
                name: "Охотник из пустоты",
                health: 5,
                damage: 2,
                special: "Поглощение света"
            }
        }
    },
    {
        id: "cthulhu",
        title: "Зов Ктулху",
        description: "Древний спит в своём городе Р'льех, но его сны проникают в умы жителей Аркхэма. Культисты стремятся пробудить его, и только вы можете предотвратить катастрофу.",
        image: "Resource/Ктулху2.jpg",
        startArea: "port",
        difficulty: "Сложная",
        estimatedTime: "3-4 часа",
        districts: {
            port: {
                id: "port",
                name: "Речной порт",
                initialClues: 3,
                initialDespair: 1,
                connectedTo: ["station", "island", "club"]
            },
            island: {
                id: "island",
                name: "Безлюдный остров",
                initialClues: 2,
                initialDespair: 2,
                connectedTo: ["port", "club", "cave"]
            },
            cave: {
                id: "cave",
                name: "Чёрная пещера",
                initialClues: 1,
                initialDespair: 3,
                hasAnomaly: true,
                connectedTo: ["island", "asylum", "cemetery"]
            }
        },
        monsters: {
            deepOne: {
                name: "Глубоководные",
                health: 4,
                damage: 2,
                special: "Может атаковать из воды"
            },
            cultist: {
                name: "Культист Ктулху",
                health: 2,
                damage: 1,
                special: "Распространяет безумие"
            },
            starspawn: {
                name: "Звёздное отродье",
                health: 6,
                damage: 3,
                special: "Аура безумия: все сыщики в том же районе должны пройти проверку Воли"
            }
        }
    }
];

export { scenarios };

// Данные аномалий
export const anomalies = {
    "timeRift": {
        description: "Время искажается вокруг вас, создавая опасные парадоксы.",
        effect: "Проверка знаний (4) или получите 2 ужаса."
    },
    "vortex": {
        description: "Пространственный разлом разрывает ткань реальности.",
        effect: "Проверка воли (3) или переместитесь в случайный район."
    },
    "madnessZone": {
        description: "Область искажённой реальности, где законы физики теряют смысл.",
        effect: "Проверка наблюдательности (3) или потеряйте 1 рассудок."
    }
}; 