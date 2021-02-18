import { getCurrentUnixTimeStamp as currTimeStamp } from './util/util';

const now = currTimeStamp();

export let mockTables = [
    {
        'clientId': 1,
        'tableId': 1,
        'employeeName': 'Hans',
        'createdAt': now,
        'acceptedAt': null
    },
    {
        'clientId': 1,
        'tableId': 3,
        'employeeName': 'Peter',
        'createdAt': now,
        'acceptedAt': null
    },
    {
        'clientId': 1,
        'tableId': 4,
        'employeeName': 'Susi',
        'createdAt': now,
        'acceptedAt': null
    },
    {
        'clientId': 2,
        'tableId': 2,
        'employeeName': 'Peter',
        'createdAt': now,
        'acceptedAt': null
    },
];

export let mockCourses = [
    {
        'clientId': 1,
        'tableId': 1,
        'courseNumber': 1,
        'finishedAt': null,
        'orders' : [1, 4, 5] //articleId
    },
    {
        'clientId': 1,
        'tableId': 1,
        'courseNumber': 2,
        'finishedAt': null,
        'orders' : [6, 6]
        },
    {
        'clientId': 1,
        'tableId': 1,
        'courseNumber': 3,
        'finishedAt': null,
        'orders' : [11, 15]
    },
    {
        'clientId': 1,
        'tableId': 3,
        'courseNumber': 3,
        'finishedAt': null,
        'orders' : [11, 12]
    },
    {
        'clientId': 1,
        'tableId': 4,
        'courseNumber': 2,
        'finishedAt': null,
        'orders' : [6, 7]
    },
    {
        'clientId': 1,
        'tableId': 4,
        'courseNumber': 3,
        'finishedAt': null,
        'orders' : [13, 14]
    },
    {
        'clientId': 2,
        'tableId': 2,
        'courseNumber': 3,
        'finishedAt': null,
        'orders' : [11, 12, 13, 14, 15]
    },
    {
        'clientId': 2,
        'tableId': 1,
        'courseNumber': 2,
        'finishedAt': null,
        'orders' : [7, 6]
    }
];

export let mockArticles = [
    {   
        'articleId': 1,
        'articleName': 'Brokkoli Suppe'
    },
    {
        'articleId': 2,  
        'articleName': 'Klare Suppe'
    },
    {
        'articleId': 3,   
        'articleName': 'Gemischter Salat mit gerösteten Kartoffeln'
    },
    {
        'articleId': 4,   
        'articleName': 'Gebratene Blunzn & Erdäpfelkas'
    },
    {
        'articleId': 5,   
        'articleName': 'Pflaumen im Speckmantel'
    },
    //Hauptgerichte
    {
        'articleId': 6,   
        'articleName': 'Forelle Mandelbutter'
    },
    {
        'articleId': 7,   
        'articleName': 'Duett von Forelle & Saibling'
    },
    {
        'articleId': 8,   
        'articleName': 'Blunzen Strozzapretti'
    },
    {
        'articleId': 9,   
        'articleName': 'Jack Daniel\'s Braten'
    },
    {
        'articleId': 10,   
        'articleName': 'Rumpsteak Mediterran'
    },
    //Nachspeisen
    {
        'articleId': 11,   
        'articleName': 'Tartufo Eis'
    },
    {
        'articleId': 12,   
        'articleName': 'Semi Freddo'
    },
    {
        'articleId': 13,   
        'articleName': 'Mango Panna'
    },
    {
        'articleId': 14,   
        'articleName': 'Schoko-Lava-Kuchen'
    },
    {
        'articleId': 15,   
        'articleName': 'Weiße Schokolade Soufflé'
    },
];

export let mockOrders = [
    {
        'articleName': 'Brokkoli Suppe',
        'articleId': 1,
        'articleSubId': 1,
        'tableId': 1,
        'clientId': 1,
        'courseNumber': 1,
        'createdAt': 1,
        'finishedAt': null,
        'cancledAt': null,
        'preordered': false,
        'mods': true
    },
    {
        'articleName': 'Gebratene Blunzn & Erdäpfelkas',
        'articleId': 2,
        'articleSubId': 1,
        'tableId': 1,
        'clientId': 1,
        'courseNumber': 1,
        'createdAt': 1,
        'finishedAt': null,
        'cancledAt': null,
        'preordered': false,
        'mods': false
    },
    {
        'articleName': 'Pflaumen im Speckmantel',
        'articleId': 3,
        'articleSubId': 1,
        'tableId': 1,
        'clientId': 1,
        'courseNumber': 1,
        'createdAt': 1,
        'finishedAt': null,
        'cancledAt': null,
        'preordered': false,
        'mods': false
    },
    {
        'articleName': 'Forelle Mandelbutter',
        'articleId': 4,
        'articleSubId': 1,
        'tableId': 1,
        'clientId': 1,
        'courseNumber': 2,
        'createdAt': 1,
        'finishedAt': null,
        'cancledAt': null,
        'preordered': false,
        'mods': false
    },
    {
        'articleName': 'Forelle Mandelbutter',
        'articleId': 4,
        'articleSubId': 2,
        'tableId': 1,
        'clientId': 1,
        'courseNumber': 2,
        'createdAt': 1,
        'finishedAt': null,
        'cancledAt': null,
        'preordered': false,
        'mods': true
    },
    {
        'articleName': 'Forelle Mandelbutter',
        'articleId': 4,
        'articleSubId': 3,
        'tableId': 1,
        'clientId': 2,
        'courseNumber': 2,
        'createdAt': 1,
        'finishedAt': null,
        'cancledAt': null,
        'preordered': false,
        'mods': false
    },
    {
        'articleName': 'Forelle Mandelbutter',
        'articleId': 4,
        'articleSubId': 4,
        'tableId': 4,
        'clientId': 1,
        'courseNumber': 2,
        'createdAt': 1,
        'finishedAt': null,
        'cancledAt': null,
        'preordered': false,
        'mods': false
    },
    {
        'articleName': 'Forelle Mandelbutter',
        'articleId': 4,
        'articleSubId': 5,
        'tableId': 4,
        'clientId': 1,
        'courseNumber': 2,
        'createdAt': 1,
        'finishedAt': null,
        'cancledAt': null,
        'preordered': false,
        'mods': false
    },
    {
        'articleName': 'Duett von Forelle & Saibling',
        'articleId': 5,
        'articleSubId': 1,
        'tableId': 1, 
        'clientId': 2,
        'courseNumber': 2,
        'createdAt': 1,
        'finishedAt': null,
        'cancledAt': null,
        'preordered': false,
        'mods': false
    },
    {
        'articleName': 'Tartufo Eis',
        'articleId': 6,
        'articleSubId': 1,
        'tableId': 1,
        'clientId': 1,
        'courseNumber': 3,
        'createdAt': 1,
        'finishedAt': null,
        'cancledAt': null,
        'preordered': false,
        'mods': false
    },
    {
        'articleName': 'Tartufo Eis',
        'articleId': 6,
        'articleSubId': 2,
        'tableId': 3,
        'clientId': 1,
        'courseNumber': 3,
        'createdAt': 1,
        'finishedAt': null,
        'cancledAt': null,
        'preordered': false,
        'mods': false
    },
    {
        'articleName': 'Tartufo Eis',
        'articleId': 6,
        'articleSubId': 3,
        'tableId': 2,
        'clientId': 2,
        'courseNumber': 3,
        'createdAt': 1,
        'finishedAt': null,
        'cancledAt': null,
        'preordered': false,
        'mods': false
    },
    {
        'articleName': 'Semi Freddo',
        'articleId': 7,
        'articleSubId': 1,
        'tableId': 3,
        'clientId': 1,
        'courseNumber': 3,
        'createdAt': 1,
        'finishedAt': null,
        'cancledAt': null,
        'preordered': false,
        'mods': false
    },
    {
        'articleName': 'Semi Freddo',
        'articleId': 7,
        'articleSubId': 2,
        'tableId': 2,
        'clientId': 2,
        'courseNumber': 3,
        'createdAt': 1,
        'finishedAt': null,
        'cancledAt': null,
        'preordered': false,
        'mods': false
    },
    {
        'articleName': 'Semi Freddo',
        'articleId': 7,
        'articleSubId': 3,
        'tableId': 3,
        'clientId': 1,
        'courseNumber': 3,
        'createdAt': 1,
        'finishedAt': null,
        'cancledAt': null,
        'preordered': false,
        'mods': false
    },
    {
        'articleName': 'Mango Panna',
        'articleId': 8,
        'articleSubId': 1,
        'tableId': 2,
        'clientId': 2,
        'courseNumber': 3,
        'createdAt': 1,
        'finishedAt': null,
        'cancledAt': null,
        'preordered': false,
        'mods': false
    },
    {
        'articleName': 'Schoko-Lava-Kuchen',
        'articleId': 9,
        'articleSubId': 1,
        'tableId': 2,
        'clientId': 2,
        'courseNumber': 3,
        'createdAt': 1,
        'finishedAt': null,
        'cancledAt': null,
        'preordered': false,
        'mods': false
    },
    {
        'articleName': 'Schoko-Lava-Kuchen',
        'articleId': 9,
        'articleSubId': 2,
        'tableId': 4,
        'clientId': 1,
        'courseNumber': 3,
        'createdAt': 1,
        'finishedAt': null,
        'cancledAt': null,
        'preordered': false,
        'mods': false
    },
    {
        'articleName': 'Weiße Schokolade Soufflé',
        'articleId': 10,
        'articleSubId': 1,
        'tableId': 2,
        'clientId': 2,
        'courseNumber': 3,
        'createdAt': 1,
        'finishedAt': null,
        'cancledAt': null,
        'preordered': false,
        'mods': false
    },
    {
        'articleName': 'Weiße Schokolade Soufflé',
        'articleId': 10,
        'articleSubId': 2,
        'tableId': 3,
        'clientId': 1,
        'courseNumber': 3,
        'createdAt': 1,
        'finishedAt': null,
        'cancledAt': null,
        'preordered': false,
        'mods': false
    },
];

export let mockModifiers = [
    {
        'clientId': 1,
        'articleId': 1,
        'articleSubId': 1,
        'modifierText': 'Mit Brot'
    },
    {
        'clientId': 1,
        'articleId': 4,
        'articleSubId': 2,
        'modifierText': 'Extra Brokkoli'
    }
];

export let newTable = {
    'clientId': 1,
    'tableId': 99,
    'employeeName': 'Linda',
    'createdAt': now,
    'acceptedAt': null
};

export let newOrder = {
    'articleName': 'Pflaumen im Speckmantel',
    'articleId': 3,
    'articleSubId': 9,
    'tableId': 99,
    'clientId': 1,
    'courseNumber': 1,
    'createdAt': 1,
    'finishedAt': null,
    'cancledAt': null,
    'preordered': false,
    'mods': false
};

export let newOrder2 = {
    'articleName': 'Duett von Forelle & Saibling',
    'articleId': 5,
    'articleSubId': 99,
    'tableId': 4, 
    'clientId': 1,
    'courseNumber': 2,
    'createdAt': 1,
    'finishedAt': null,
    'cancledAt': null,
    'preordered': false,
    'modifier': []
};

export let newCourse  = {
    'clientId': 1,
    'tableId': 99,
    'courseNumber': 1,
    'finishedAt': null,
    'orders' : [3] 
};