// Данные сценариев
export const scenarios = {
    "azathoth": {
        id: "azathoth",
        title: "Пришествие Азатота",
        description: "Древний бог пробуждается в Аркхэме...",
        image: "./Resource/azathoth-card-bg.webp.jpg",
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
                connectedTo: ["station"]
            },
            {
                id: "old_well",
                name: "Старый колодец",
                initialClues: 0,
                initialDespair: 2,
                hasAnomaly: true,
                connectedTo: ["station"]
            }
        ],
        monsters: ["Безглазый наблюдатель", "Псы Тиндалоса"]
    },
    "cthulhu": {
        id: "cthulhu",
        title: "Зов Ктулху",
        description: "Древний спит в своём городе Р'льех...",
        image: "./Resource/Ктулху2.jpg",
        startArea: "port",
        districts: [
            {
                id: "port",
                name: "Порт",
                initialClues: 3,
                initialDespair: 1,
                connectedTo: ["warehouse", "fish_market"]
            }
            // Добавьте другие районы
        ]
    }
};

// Данные аномалий
export const anomalies = {
    "timeRift": {
        description: "Время искажается...",
        effect: "Проверка знаний (4) или получите 2 ужаса."
    },
    "vortex": {
        description: "Пространственный разлом",
        effect: "Проверка воли (3) или переместитесь в случайный район."
    }
}; 