export const characters = [
    {
        id: 'agnes',
        name: 'Агнес Бейкер',
        role: 'Официантка',
        stats: {
            health: 6,
            sanity: 6,
            knowledge: 4,
            influence: 2,
            observation: 2,
            strength: 2,
            will: 3
        },
        ability: {
            name: 'Кровавые чары',
            description: 'Вы можете получать урон вместо ужаса при чтении заклинаний'
        },
        secondaryAbility: {
            name: 'Сила крови',
            description: 'Если при чтении заклинания вы получаете урон или тратите трофеи, вы получаете +2'
        },
        quote: 'Истина не всегда такова, какой кажется',
        defaultItems: [
            'Гиперборейская реликвия',
            '$3'
        ],
        choiceItems: [
            'Буря духов',
            'Защита плоти'
        ]
    },
    {
        id: 'tommy',
        name: 'Томми Малдун',
        role: 'Юный полицейский',
        stats: {
            health: 7,
            sanity: 5,
            knowledge: 2,
            influence: 2,
            observation: 3,
            strength: 3,
            will: 3
        },
        ability: {
            name: 'Оградить от беды',
            description: 'Если монстр должен вступить в бой с другим сыщиком в вашей области, вместо этого вы можете вступить в бой с этим монстром'
        },
        secondaryAbility: {
            name: 'Служить и защищать',
            description: 'Когда вы вступаете в бой с монстром вместо другого сыщика, получите +1 к проверкам до конца боя'
        },
        quote: 'Ну что, Томми. Время стать героем',
        defaultItems: [
            'Бекки',
            '$2'
        ],
        choiceItems: [
            'Наручники',
            'Мотоцикл'
        ]
    },
    {
        id: 'jenny-barnes',
        name: 'Дженни Барнс',
        role: 'Дилетант',
        stats: {
            health: 7,
            sanity: 7,
            strength: 3,
            will: 4,
            observation: 4,
            influence: 4
        },
        ability: {
            name: 'Независимое состояние',
            description: 'Начните игру с 8$. В начале каждого раунда получайте 2$.'
        },
        defaultItems: [
            'Револьвер .38',
            'Помада',
            '8$'
        ],
        choiceItems: [
            'Кожаное пальто',
            'Счастливая монета'
        ]
    },
    {
        id: 'harvey-walters',
        name: 'Харви Уолтерс',
        role: 'Профессор',
        stats: {
            health: 5,
            sanity: 9,
            strength: 2,
            will: 5,
            observation: 4,
            influence: 3
        },
        ability: {
            name: 'Оккультные знания',
            description: 'При проверке знаний можете перебросить один кубик.'
        },
        secondaryAbility: {
            name: 'Исследователь',
            description: 'Один раз за раунд можете получить 1 улику, находясь в локации с книжным символом.'
        },
        defaultItems: [
            'Древний фолиант',
            'Защитный амулет'
        ]
    },
    {
        id: 'joe-diamond',
        name: 'Джо Даймонд',
        role: 'Частный детектив',
        stats: {
            health: 8,
            sanity: 6,
            strength: 4,
            will: 3,
            observation: 5,
            influence: 3
        },
        ability: {
            name: 'Детективное чутьё',
            description: 'При получении улики можете получить одну дополнительную улику.'
        },
        defaultItems: [
            'Револьвер .45',
            'Лупа',
            'Детективное удостоверение'
        ],
        choiceItems: [
            'Фотоаппарат',
            'Наручники'
        ]
    }
]; 