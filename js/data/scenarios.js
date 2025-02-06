// Данные сценариев
export const scenarios = {
    "azathoth": {
        id: "azathoth",
        title: "Пришествие Азатота",
        description: "Древний бог пробуждается в Аркхэме, и его безумное присутствие угрожает разорвать саму ткань реальности. Вы должны остановить его пробуждение, пока не стало слишком поздно.",
        image: "Resource/azathoth-card-bg.webp.jpg",
        startArea: "station",
        districts: [
            { 
                id: "station",
                name: "Вокзал",
                initialClues: 2,
                initialDespair: 0,
                connectedTo: ["north_street", "old_well"]
            },
            {
                id: "north_street",
                name: "Северная улица",
                initialClues: 1,
                initialDespair: 1,
                connectedTo: ["station", "old_well"]
            },
            {
                id: "old_well",
                name: "Старый колодец",
                initialClues: 0,
                initialDespair: 2,
                hasAnomaly: true,
                connectedTo: ["station", "north_street"]
            }
        ],
        monsters: ["Безглазый наблюдатель", "Псы Тиндалоса", "Охотник из пустоты"],
        difficulty: "Средняя",
        estimatedTime: "2-3 часа"
    },
    "cthulhu": {
        id: "cthulhu",
        title: "Зов Ктулху",
        description: "Древний спит в своём городе Р'льех, но его сны проникают в умы жителей Аркхэма. Культисты стремятся пробудить его, и только вы можете предотвратить катастрофу.",
        image: "Resource/Ктулху2.jpg",
        startArea: "port",
        districts: [
            {
                id: "port",
                name: "Порт",
                initialClues: 3,
                initialDespair: 1,
                connectedTo: ["warehouse", "fish_market"]
            },
            {
                id: "warehouse",
                name: "Склады",
                initialClues: 2,
                initialDespair: 2,
                connectedTo: ["port", "fish_market"]
            },
            {
                id: "fish_market",
                name: "Рыбный рынок",
                initialClues: 1,
                initialDespair: 3,
                hasAnomaly: true,
                connectedTo: ["port", "warehouse"]
            }
        ],
        monsters: ["Глубоководные", "Культисты Ктулху", "Звёздное отродье"],
        difficulty: "Сложная",
        estimatedTime: "3-4 часа"
    }
};

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