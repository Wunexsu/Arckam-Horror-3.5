export const locations = {
    "square": {
        id: "square",
        name: "Площадь независимости",
        image: "Locations/Площадь независимости.webp",
        description: "Центральная площадь Аркхэма, место встреч и важных событий.",
        connectedTo: ["newspaper", "diner", "station", "shop"]
    },
    "newspaper": {
        id: "newspaper",
        name: "Аркхем Адвентайзер",
        image: "Locations/Аркхем Адвентайзер.webp",
        description: "Городская газета, источник последних новостей и слухов.",
        connectedTo: ["square", "police", "diner"]
    },
    "diner": {
        id: "diner",
        name: "Закусочная Хибба",
        image: "Locations/закусочная хибба комикс.webp",
        description: "Уютная закусочная, где можно перекусить и услышать последние сплетни.",
        connectedTo: ["square", "newspaper", "witch_restaurant"]
    },
    "station": {
        id: "station",
        name: "Вокзал",
        image: "Locations/вокзал комикс.webp",
        description: "Железнодорожный вокзал Аркхэма, ворота в город.",
        connectedTo: ["square", "port", "shop"]
    },
    "shop": {
        id: "shop",
        name: "Магазин",
        image: "Locations/Магазин комикс.webp",
        description: "Магазин со всем необходимым и не только.",
        connectedTo: ["square", "station", "curiosity"]
    },
    "police": {
        id: "police",
        name: "Полицейский участок",
        image: "Locations/полицейский участок комикс 2.webp",
        description: "Центр правопорядка Аркхэма.",
        connectedTo: ["newspaper", "asylum", "cemetery"]
    },
    "port": {
        id: "port",
        name: "Речной порт",
        image: "Locations/речной порт комикс.webp",
        description: "Порт на реке Мискатоник, место прибытия странных грузов.",
        connectedTo: ["station", "island", "club"]
    },
    "asylum": {
        id: "asylum",
        name: "Лечебница",
        image: "Locations/Лечебница комикс.webp",
        description: "Аркхэмская лечебница для душевнобольных.",
        connectedTo: ["police", "cave", "cemetery"]
    },
    "witch_restaurant": {
        id: "witch_restaurant",
        name: "Ресторан Ведьмы",
        image: "Locations/ресторан ведьмы комикс.webp",
        description: "Таинственный ресторан с необычной кухней.",
        connectedTo: ["diner", "bella_luna", "curiosity"]
    },
    "curiosity": {
        id: "curiosity",
        name: "Лавка редкостей",
        image: "Locations/давка редкостей комикс.webp",
        description: "Магазин оккультных товаров и древних артефактов.",
        connectedTo: ["shop", "witch_restaurant", "bella_luna"]
    },
    "bella_luna": {
        id: "bella_luna",
        name: "La Bella Luna",
        image: "Locations/La bella luna комикс.webp",
        description: "Итальянский ресторан с темной историей.",
        connectedTo: ["witch_restaurant", "curiosity", "club"]
    },
    "club": {
        id: "club",
        name: "Клуб Тик-Так",
        image: "Locations/клуб тик так комикс.webp",
        description: "Популярный ночной клуб Аркхэма.",
        connectedTo: ["port", "bella_luna", "island"]
    },
    "island": {
        id: "island",
        name: "Безлюдный остров",
        image: "Locations/безлюдный остров комикс.webp",
        description: "Таинственный остров посреди реки Мискатоник.",
        connectedTo: ["port", "club", "cave"]
    },
    "cave": {
        id: "cave",
        name: "Чёрная пещера",
        image: "Locations/чёрная пещера комикс.webp",
        description: "Древняя пещера с загадочными символами.",
        connectedTo: ["island", "asylum", "cemetery"]
    },
    "cemetery": {
        id: "cemetery",
        name: "Кладбище",
        image: "Locations/кладбище комикс.webp",
        description: "Старое городское кладбище.",
        connectedTo: ["police", "asylum", "cave"]
    }
}; 