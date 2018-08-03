var brain = require("brain.js")
var request = require('request'); // "Request" library
var fs = require('fs');

var config = {
	iterations: 100,
	log: true,
	logPeriod: 1,
	errorThresh: 0.25,
	learningRate: 0.3,
    hiddenLayers: [256,128,64],     // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid' // Supported activation types ['sigmoid', 'relu', 'leaky-relu', 'tanh']
}
//create a simple feed forward neural network with backpropagation

var net = new brain.NeuralNetwork();
 
//net.train([{input: [0, 0], output: [0]},
//           {input: [0, 1], output: [1]},
//           {input: [1, 0], output: [1]},
//           {input: [1, 1], output: [0]}]);
 
//var output = net.run([1, 0]);  // [0.987]

//console.log(output);

var iterationCount = 0;
var numberOfChamps = 142;


//form conversions

var champData = {
  "data": {
    "1": {
      "id": 1,
      "key": "Annie",
      "name": "Annie",
      "title": "the Dark Child",
      "count": 0
    },
    "2": {
      "id": 2,
      "key": "Olaf",
      "name": "Olaf",
      "title": "the Berserker",
      "count": 1
    },
    "3": {
      "id": 3,
      "key": "Galio",
      "name": "Galio",
      "title": "the Colossus",
      "count": 2
    },
    "4": {
      "id": 4,
      "key": "TwistedFate",
      "name": "Twisted Fate",
      "title": "the Card Master",
      "count": 3
    },
    "5": {
      "id": 5,
      "key": "XinZhao",
      "name": "Xin Zhao",
      "title": "the Seneschal of Demacia",
      "count": 4
    },
    "6": {
      "id": 6,
      "key": "Urgot",
      "name": "Urgot",
      "title": "the Dreadnought",
      "count": 5
    },
    "7": {
      "id": 7,
      "key": "Leblanc",
      "name": "LeBlanc",
      "title": "the Deceiver",
      "count": 6
    },
    "8": {
      "id": 8,
      "key": "Vladimir",
      "name": "Vladimir",
      "title": "the Crimson Reaper",
      "count": 7
    },
    "9": {
      "id": 9,
      "key": "Fiddlesticks",
      "name": "Fiddlesticks",
      "title": "the Harbinger of Doom",
      "count": 8
    },
    "10": {
      "id": 10,
      "key": "Kayle",
      "name": "Kayle",
      "title": "The Judicator",
      "count": 9
    },
    "11": {
      "id": 11,
      "key": "MasterYi",
      "name": "Master Yi",
      "title": "the Wuju Bladesman",
      "count": 10
    },
    "12": {
      "id": 12,
      "key": "Alistar",
      "name": "Alistar",
      "title": "the Minotaur",
      "count": 11
    },
    "13": {
      "id": 13,
      "key": "Ryze",
      "name": "Ryze",
      "title": "the Rune Mage",
      "count": 12
    },
    "14": {
      "id": 14,
      "key": "Sion",
      "name": "Sion",
      "title": "The Undead Juggernaut",
      "count": 13
    },
    "15": {
      "id": 15,
      "key": "Sivir",
      "name": "Sivir",
      "title": "the Battle Mistress",
      "count": 14
    },
    "16": {
      "id": 16,
      "key": "Soraka",
      "name": "Soraka",
      "title": "the Starchild",
      "count": 15
    },
    "17": {
      "id": 17,
      "key": "Teemo",
      "name": "Teemo",
      "title": "the Swift Scout",
      "count": 16
    },
    "18": {
      "id": 18,
      "key": "Tristana",
      "name": "Tristana",
      "title": "the Yordle Gunner",
      "count": 17
    },
    "19": {
      "id": 19,
      "key": "Warwick",
      "name": "Warwick",
      "title": "the Uncaged Wrath of Zaun",
      "count": 18
    },
    "20": {
      "id": 20,
      "key": "Nunu",
      "name": "Nunu",
      "title": "the Yeti Rider",
      "count": 19
    },
    "21": {
      "id": 21,
      "key": "MissFortune",
      "name": "Miss Fortune",
      "title": "the Bounty Hunter",
      "count": 20
    },
    "22": {
      "id": 22,
      "key": "Ashe",
      "name": "Ashe",
      "title": "the Frost Archer",
      "count": 21
    },
    "23": {
      "id": 23,
      "key": "Tryndamere",
      "name": "Tryndamere",
      "title": "the Barbarian King",
      "count": 22
    },
    "24": {
      "id": 24,
      "key": "Jax",
      "name": "Jax",
      "title": "Grandmaster at Arms",
      "count": 23
    },
    "25": {
      "id": 25,
      "key": "Morgana",
      "name": "Morgana",
      "title": "Fallen Angel",
      "count": 24
    },
    "26": {
      "id": 26,
      "key": "Zilean",
      "name": "Zilean",
      "title": "the Chronokeeper",
      "count": 25
    },
    "27": {
      "id": 27,
      "key": "Singed",
      "name": "Singed",
      "title": "the Mad Chemist",
      "count": 26
    },
    "28": {
      "id": 28,
      "key": "Evelynn",
      "name": "Evelynn",
      "title": "Agony's Embrace",
      "count": 27
    },
    "29": {
      "id": 29,
      "key": "Twitch",
      "name": "Twitch",
      "title": "the Plague Rat",
      "count": 28
    },
    "30": {
      "id": 30,
      "key": "Karthus",
      "name": "Karthus",
      "title": "the Deathsinger",
      "count": 29
    },
    "31": {
      "id": 31,
      "key": "Chogath",
      "name": "Cho'Gath",
      "title": "the Terror of the Void",
      "count": 30
    },
    "32": {
      "id": 32,
      "key": "Amumu",
      "name": "Amumu",
      "title": "the Sad Mummy",
      "count": 31
    },
    "33": {
      "id": 33,
      "key": "Rammus",
      "name": "Rammus",
      "title": "the Armordillo",
      "count": 32
    },
    "34": {
      "id": 34,
      "key": "Anivia",
      "name": "Anivia",
      "title": "the Cryophoenix",
      "count": 33
    },
    "35": {
      "id": 35,
      "key": "Shaco",
      "name": "Shaco",
      "title": "the Demon Jester",
      "count": 34
    },
    "36": {
      "id": 36,
      "key": "DrMundo",
      "name": "Dr. Mundo",
      "title": "the Madman of Zaun",
      "count": 35
    },
    "37": {
      "id": 37,
      "key": "Sona",
      "name": "Sona",
      "title": "Maven of the Strings",
      "count": 36
    },
    "38": {
      "id": 38,
      "key": "Kassadin",
      "name": "Kassadin",
      "title": "the Void Walker",
      "count": 37
    },
    "39": {
      "id": 39,
      "key": "Irelia",
      "name": "Irelia",
      "title": "the Blade Dancer",
      "count": 38
    },
    "40": {
      "id": 40,
      "key": "Janna",
      "name": "Janna",
      "title": "the Storm's Fury",
      "count": 39
    },
    "41": {
      "id": 41,
      "key": "Gangplank",
      "name": "Gangplank",
      "title": "the Saltwater Scourge",
      "count": 40
    },
    "42": {
      "id": 42,
      "key": "Corki",
      "name": "Corki",
      "title": "the Daring Bombardier",
      "count": 41
    },
    "43": {
      "id": 43,
      "key": "Karma",
      "name": "Karma",
      "title": "the Enlightened One",
      "count": 42
    },
    "44": {
      "id": 44,
      "key": "Taric",
      "name": "Taric",
      "title": "the Shield of Valoran",
      "count": 43
    },
    "45": {
      "id": 45,
      "key": "Veigar",
      "name": "Veigar",
      "title": "the Tiny Master of Evil",
      "count": 44
    },
    "48": {
      "id": 48,
      "key": "Trundle",
      "name": "Trundle",
      "title": "the Troll King",
      "count": 45
    },
    "50": {
      "id": 50,
      "key": "Swain",
      "name": "Swain",
      "title": "the Noxian Grand General",
      "count": 46
    },
    "51": {
      "id": 51,
      "key": "Caitlyn",
      "name": "Caitlyn",
      "title": "the Sheriff of Piltover",
      "count": 47
    },
    "53": {
      "id": 53,
      "key": "Blitzcrank",
      "name": "Blitzcrank",
      "title": "the Great Steam Golem",
      "count": 48
    },
    "54": {
      "id": 54,
      "key": "Malphite",
      "name": "Malphite",
      "title": "Shard of the Monolith",
      "count": 49
    },
    "55": {
      "id": 55,
      "key": "Katarina",
      "name": "Katarina",
      "title": "the Sinister Blade",
      "count": 50
    },
    "56": {
      "id": 56,
      "key": "Nocturne",
      "name": "Nocturne",
      "title": "the Eternal Nightmare",
      "count": 51
    },
    "57": {
      "id": 57,
      "key": "Maokai",
      "name": "Maokai",
      "title": "the Twisted Treant",
      "count": 52
    },
    "58": {
      "id": 58,
      "key": "Renekton",
      "name": "Renekton",
      "title": "the Butcher of the Sands",
      "count": 53
    },
    "59": {
      "id": 59,
      "key": "JarvanIV",
      "name": "Jarvan IV",
      "title": "the Exemplar of Demacia",
      "count": 54
    },
    "60": {
      "id": 60,
      "key": "Elise",
      "name": "Elise",
      "title": "the Spider Queen",
      "count": 55
    },
    "61": {
      "id": 61,
      "key": "Orianna",
      "name": "Orianna",
      "title": "the Lady of Clockwork",
      "count": 56
    },
    "62": {
      "id": 62,
      "key": "MonkeyKing",
      "name": "Wukong",
      "title": "the Monkey King",
      "count": 57
    },
    "63": {
      "id": 63,
      "key": "Brand",
      "name": "Brand",
      "title": "the Burning Vengeance",
      "count": 58
    },
    "64": {
      "id": 64,
      "key": "LeeSin",
      "name": "Lee Sin",
      "title": "the Blind Monk",
      "count": 59
    },
    "67": {
      "id": 67,
      "key": "Vayne",
      "name": "Vayne",
      "title": "the Night Hunter",
      "count": 60
    },
    "68": {
      "id": 68,
      "key": "Rumble",
      "name": "Rumble",
      "title": "the Mechanized Menace",
      "count": 61
    },
    "69": {
      "id": 69,
      "key": "Cassiopeia",
      "name": "Cassiopeia",
      "title": "the Serpent's Embrace",
      "count": 62
    },
    "72": {
      "id": 72,
      "key": "Skarner",
      "name": "Skarner",
      "title": "the Crystal Vanguard",
      "count": 63
    },
    "74": {
      "id": 74,
      "key": "Heimerdinger",
      "name": "Heimerdinger",
      "title": "the Revered Inventor",
      "count": 64
    },
    "75": {
      "id": 75,
      "key": "Nasus",
      "name": "Nasus",
      "title": "the Curator of the Sands",
      "count": 65
    },
    "76": {
      "id": 76,
      "key": "Nidalee",
      "name": "Nidalee",
      "title": "the Bestial Huntress",
      "count": 66
    },
    "77": {
      "id": 77,
      "key": "Udyr",
      "name": "Udyr",
      "title": "the Spirit Walker",
      "count": 67
    },
    "78": {
      "id": 78,
      "key": "Poppy",
      "name": "Poppy",
      "title": "Keeper of the Hammer",
      "count": 68
    },
    "79": {
      "id": 79,
      "key": "Gragas",
      "name": "Gragas",
      "title": "the Rabble Rouser",
      "count": 69
    },
    "80": {
      "id": 80,
      "key": "Pantheon",
      "name": "Pantheon",
      "title": "the Artisan of War",
      "count": 70
    },
    "81": {
      "id": 81,
      "key": "Ezreal",
      "name": "Ezreal",
      "title": "the Prodigal Explorer",
      "count": 71
    },
    "82": {
      "id": 82,
      "key": "Mordekaiser",
      "name": "Mordekaiser",
      "title": "the Iron Revenant",
      "count": 72
    },
    "83": {
      "id": 83,
      "key": "Yorick",
      "name": "Yorick",
      "title": "Shepherd of Souls",
      "count": 73
    },
    "84": {
      "id": 84,
      "key": "Akali",
      "name": "Akali",
      "title": "the Fist of Shadow",
      "count": 74
    },
    "85": {
      "id": 85,
      "key": "Kennen",
      "name": "Kennen",
      "title": "the Heart of the Tempest",
      "count": 75
    },
    "86": {
      "id": 86,
      "key": "Garen",
      "name": "Garen",
      "title": "The Might of Demacia",
      "count": 76
    },
    "89": {
      "id": 89,
      "key": "Leona",
      "name": "Leona",
      "title": "the Radiant Dawn",
      "count": 77
    },
    "90": {
      "id": 90,
      "key": "Malzahar",
      "name": "Malzahar",
      "title": "the Prophet of the Void",
      "count": 78
    },
    "91": {
      "id": 91,
      "key": "Talon",
      "name": "Talon",
      "title": "the Blade's Shadow",
      "count": 79
    },
    "92": {
      "id": 92,
      "key": "Riven",
      "name": "Riven",
      "title": "the Exile",
      "count": 80
    },
    "96": {
      "id": 96,
      "key": "KogMaw",
      "name": "Kog'Maw",
      "title": "the Mouth of the Abyss",
      "count": 81
    },
    "98": {
      "id": 98,
      "key": "Shen",
      "name": "Shen",
      "title": "the Eye of Twilight",
      "count": 82
    },
    "99": {
      "id": 99,
      "key": "Lux",
      "name": "Lux",
      "title": "the Lady of Luminosity",
      "count": 83
    },
    "101": {
      "id": 101,
      "key": "Xerath",
      "name": "Xerath",
      "title": "the Magus Ascendant",
      "count": 84
    },
    "102": {
      "id": 102,
      "key": "Shyvana",
      "name": "Shyvana",
      "title": "the Half-Dragon",
      "count": 85
    },
    "103": {
      "id": 103,
      "key": "Ahri",
      "name": "Ahri",
      "title": "the Nine-Tailed Fox",
      "count": 86
    },
    "104": {
      "id": 104,
      "key": "Graves",
      "name": "Graves",
      "title": "the Outlaw",
      "count": 87
    },
    "105": {
      "id": 105,
      "key": "Fizz",
      "name": "Fizz",
      "title": "the Tidal Trickster",
      "count": 88
    },
    "106": {
      "id": 106,
      "key": "Volibear",
      "name": "Volibear",
      "title": "the Thunder's Roar",
      "count": 89
    },
    "107": {
      "id": 107,
      "key": "Rengar",
      "name": "Rengar",
      "title": "the Pridestalker",
      "count": 90
    },
    "110": {
      "id": 110,
      "key": "Varus",
      "name": "Varus",
      "title": "the Arrow of Retribution",
      "count": 91
    },
    "111": {
      "id": 111,
      "key": "Nautilus",
      "name": "Nautilus",
      "title": "the Titan of the Depths",
      "count": 92
    },
    "112": {
      "id": 112,
      "key": "Viktor",
      "name": "Viktor",
      "title": "the Machine Herald",
      "count": 93
    },
    "113": {
      "id": 113,
      "key": "Sejuani",
      "name": "Sejuani",
      "title": "Fury of the North",
      "count": 94
    },
    "114": {
      "id": 114,
      "key": "Fiora",
      "name": "Fiora",
      "title": "the Grand Duelist",
      "count": 95
    },
    "115": {
      "id": 115,
      "key": "Ziggs",
      "name": "Ziggs",
      "title": "the Hexplosives Expert",
      "count": 96
    },
    "117": {
      "id": 117,
      "key": "Lulu",
      "name": "Lulu",
      "title": "the Fae Sorceress",
      "count": 97
    },
    "119": {
      "id": 119,
      "key": "Draven",
      "name": "Draven",
      "title": "the Glorious Executioner",
      "count": 98
    },
    "120": {
      "id": 120,
      "key": "Hecarim",
      "name": "Hecarim",
      "title": "the Shadow of War",
      "count": 99
    },
    "121": {
      "id": 121,
      "key": "Khazix",
      "name": "Kha'Zix",
      "title": "the Voidreaver",
      "count": 100
    },
    "122": {
      "id": 122,
      "key": "Darius",
      "name": "Darius",
      "title": "the Hand of Noxus",
      "count": 101
    },
    "126": {
      "id": 126,
      "key": "Jayce",
      "name": "Jayce",
      "title": "the Defender of Tomorrow",
      "count": 102
    },
    "127": {
      "id": 127,
      "key": "Lissandra",
      "name": "Lissandra",
      "title": "the Ice Witch",
      "count": 103
    },
    "131": {
      "id": 131,
      "key": "Diana",
      "name": "Diana",
      "title": "Scorn of the Moon",
      "count": 104
    },
    "133": {
      "id": 133,
      "key": "Quinn",
      "name": "Quinn",
      "title": "Demacia's Wings",
      "count": 105
    },
    "134": {
      "id": 134,
      "key": "Syndra",
      "name": "Syndra",
      "title": "the Dark Sovereign",
      "count": 106
    },
    "136": {
      "id": 136,
      "key": "AurelionSol",
      "name": "Aurelion Sol",
      "title": "The Star Forger",
      "count": 107
    },
    "141": {
      "id": 141,
      "key": "Kayn",
      "name": "Kayn",
      "title": "the Shadow Reaper",
      "count": 108
    },
    "142": {
      "id": 142,
      "key": "Zoe",
      "name": "Zoe",
      "title": "the Aspect of Twilight",
      "count": 109
    },
    "143": {
      "id": 143,
      "key": "Zyra",
      "name": "Zyra",
      "title": "Rise of the Thorns",
      "count": 110
    },
    "145": {
      "id": 145,
      "key": "Kaisa",
      "name": "Kai'Sa",
      "title": "Daughter of the Void",
      "count": 111
    },
    "150": {
      "id": 150,
      "key": "Gnar",
      "name": "Gnar",
      "title": "the Missing Link",
      "count": 112
    },
    "154": {
      "id": 154,
      "key": "Zac",
      "name": "Zac",
      "title": "the Secret Weapon",
      "count": 113
    },
    "157": {
      "id": 157,
      "key": "Yasuo",
      "name": "Yasuo",
      "title": "the Unforgiven",
      "count": 114
    },
    "161": {
      "id": 161,
      "key": "Velkoz",
      "name": "Vel'Koz",
      "title": "the Eye of the Void",
      "count": 115
    },
    "163": {
      "id": 163,
      "key": "Taliyah",
      "name": "Taliyah",
      "title": "the Stoneweaver",
      "count": 116
    },
    "164": {
      "id": 164,
      "key": "Camille",
      "name": "Camille",
      "title": "the Steel Shadow",
      "count": 117
    },
    "201": {
      "id": 201,
      "key": "Braum",
      "name": "Braum",
      "title": "the Heart of the Freljord",
      "count": 118
    },
    "202": {
      "id": 202,
      "key": "Jhin",
      "name": "Jhin",
      "title": "the Virtuoso",
      "count": 119
    },
    "203": {
      "id": 203,
      "key": "Kindred",
      "name": "Kindred",
      "title": "The Eternal Hunters",
      "count": 120
    },
    "222": {
      "id": 222,
      "key": "Jinx",
      "name": "Jinx",
      "title": "the Loose Cannon",
      "count": 121
    },
    "223": {
      "id": 223,
      "key": "TahmKench",
      "name": "Tahm Kench",
      "title": "the River King",
      "count": 122
    },
    "236": {
      "id": 236,
      "key": "Lucian",
      "name": "Lucian",
      "title": "the Purifier",
      "count": 123
    },
    "238": {
      "id": 238,
      "key": "Zed",
      "name": "Zed",
      "title": "the Master of Shadows",
      "count": 124
    },
    "240": {
      "id": 240,
      "key": "Kled",
      "name": "Kled",
      "title": "the Cantankerous Cavalier",
      "count": 125
    },
    "245": {
      "id": 245,
      "key": "Ekko",
      "name": "Ekko",
      "title": "the Boy Who Shattered Time",
      "count": 126
    },
    "254": {
      "id": 254,
      "key": "Vi",
      "name": "Vi",
      "title": "the Piltover Enforcer",
      "count": 127
    },
    "266": {
      "id": 266,
      "key": "Aatrox",
      "name": "Aatrox",
      "title": "the Darkin Blade",
      "count": 128
    },
    "267": {
      "id": 267,
      "key": "Nami",
      "name": "Nami",
      "title": "the Tidecaller",
      "count": 129
    },
    "268": {
      "id": 268,
      "key": "Azir",
      "name": "Azir",
      "title": "the Emperor of the Sands",
      "count": 130
    },
    "412": {
      "id": 412,
      "key": "Thresh",
      "name": "Thresh",
      "title": "the Chain Warden",
      "count": 131
    },
    "420": {
      "id": 420,
      "key": "Illaoi",
      "name": "Illaoi",
      "title": "the Kraken Priestess",
      "count": 132
    },
    "421": {
      "id": 421,
      "key": "RekSai",
      "name": "Rek'Sai",
      "title": "the Void Burrower",
      "count": 133
    },
    "427": {
      "id": 427,
      "key": "Ivern",
      "name": "Ivern",
      "title": "the Green Father",
      "count": 134
    },
    "429": {
      "id": 429,
      "key": "Kalista",
      "name": "Kalista",
      "title": "the Spear of Vengeance",
      "count": 135
    },
    "432": {
      "id": 432,
      "key": "Bard",
      "name": "Bard",
      "title": "the Wandering Caretaker",
      "count": 136
    },
    "497": {
      "id": 497,
      "key": "Rakan",
      "name": "Rakan",
      "title": "The Charmer",
      "count": 137
    },
    "498": {
      "id": 498,
      "key": "Xayah",
      "name": "Xayah",
      "title": "the Rebel",
      "count": 138
    },
    "516": {
      "id": 516,
      "key": "Ornn",
      "name": "Ornn",
      "title": "The Fire below the Mountain",
      "count": 139
    },
    "555": {
      "id": 555,
      "key": "Pyke",
      "name": "Pyke",
      "title": "the Bloodharbor Ripper",
      "count": 140
    },
	"555": {
      "title": "the Bloodharbor Ripper",
      "id": 555,
      "key": "Pyke",
      "name": "Pyke",
	  "count": 141
    }
  },
  "type": "champion",
  "version": "8.13.1"
}

function nameToId(theName) {
	for (var i in champData.data) {
		if (champData.data[i].name == theName) {return i;}
	}
	return null;
}

function idToName(id) {
	return champData.data[id].name;
}

function idToCount(id) {
	return champData.data[id].count;
}

function countToId(count) {
	for (var i in champData.data) {
		if (champData.data[i].count == count) {return i;}
	}
	return null;
}

function countToName(count) {
	for (var i in champData.data) {
		if (champData.data[i].count == count) {return champData.data[i].name;}
	}
	return null;
}

function nameToCount(theName) {
	for (var i in champData.data) {
		if (champData.data[i].name == theName) {return champData.data[i].count;}
	}
	return null;
}




//.log(champData);


var startId = 2780588730;
var chunkAmt = 2;
var apiLimitsHit = 0;

var wait = false;
var getMatchBatch = function(startNum, dir) {
	startId = startNum;
	if (startNum == null) {
		startId = parseInt(fs.readdirSync(__dirname + dir).pop().replace(/\.[^/.]+$/, ""));
	}
	console.log(startNum + "   apiLimitsHit: " + apiLimitsHit);
	for (var i = 0; i < chunkAmt; i++) {
		getMatch(startId + i, dir, function(error) {
			console.log(error);
			if (error == 429) {
				wait = true;
			}
		});
	}
	startId += chunkAmt;
	if (wait) {
		wait = false;
		apiLimitsHit++;
		console.log("Waiting for API");
		setTimeout(getMatchBatch, 60000, startId, dir);
	} else {
		setTimeout(getMatchBatch, 200, startId, dir);
	}
}
//getMatchBatch();

//getMatch(startId);

function getMatch(matchId, dir, errorCallback) {
	var URL = "https://na1.api.riotgames.com/lol/match/v3/matches/" + matchId + "?api_key=" + process.env.RIOTTILTSEEKERAPIKEY;
	//console.log(URL);
	request({uri: URL,timeout: 1500}, function (err, response, body) {
		if (!err && response.statusCode == 429) {
			console.log("API limit hit");
			errorCallback(response.statusCode);
			return;
		}
		if (!err && response.statusCode == 200) {
			var json = JSON.parse(body);
			if (json.queueId == 420) {
				console.log("success");
				fs.writeFile(__dirname + dir + matchId + ".json", body, function(err) {
					if (err) {
						//console.log(err);
					}
				});
			}
			return json;
		} else {
			if (err) {console.log(err);}
			//console.log(response.statusCode);
		}
	});
}


function learn(dir) {
	var matchList = fs.readdirSync(__dirname + "/" + dir);
	console.log("reading matches");
	var brainData = readMatches(matchList, "/" + dir + "/");
	fs.writeFile(__dirname + "/calculated.json", JSON.stringify(brainData), function(err) {
						if (err) {
							//console.log(err);
						}
	});
	console.log("Matches loaded: " + brainData.length);

	var actual = brainData;

	console.log(net.train(brainData,config));

	var netJson = net.toJSON();
	fs.writeFile(__dirname + "/net.json", JSON.stringify(netJson), function(err) {
						if (err) {
							console.log(err);
						}
	});
}


function test(confidenceInterval) {
	
	var matchList = fs.readdirSync(__dirname + "/untrainedMatchesProcessed");
	console.log("reading matches");
	var brainData = readMatches(matchList, "/untrainedMatchesProcessed/");
	//brainData = flipMatches(brainData);
	fs.writeFile(__dirname + "/calculatedUntrained.json", JSON.stringify(brainData), function(err) {
						if (err) {
							//console.log(err);
						}
	});
	
	
	var file = fs.readFileSync(__dirname + "/net.json");
	var json = JSON.parse(file);
	net.fromJSON(json);

	var totalCorrect = 0;
	var totalGuesses = 0;
	var totalGuessed = 0;
	for (var i = 0; i < brainData.length; i++) {
		var guess = (net.run(brainData[i].input)[0] + (-(net.run(flipMatch(brainData[i]).input)[0]-0.5)+0.5))/2;
		var correctedGuess = Math.round(guess);
		if (guess < 0.5-confidenceInterval || guess > 0.5+confidenceInterval) {
			console.log(guess + "  " + brainData[i].output);
			console.log(matchPrint(brainData[i]));
			totalGuessed++;
			if (correctedGuess == brainData[i].output) {
				totalCorrect++;
			}
			totalGuesses++;
		}
	}
	console.log("----------------");
	console.log("Matches guessed: " + totalGuessed + "/" + brainData.length + " (" + Math.round(totalGuessed*10000/brainData.length)/100 + "%)");
	console.log("Matches correct: " + totalCorrect + "/" + totalGuessed + " (" + Math.round(totalCorrect*10000/totalGuessed)/100 + "%)");
}

function testMany() {
	var matchList = fs.readdirSync(__dirname + "/untrainedMatchesProcessed");
	console.log("reading matches");
	var brainData = readMatches(matchList, "/untrainedMatchesProcessed/");
	//brainData = flipMatches(brainData);
	fs.writeFile(__dirname + "/calculatedUntrained.json", JSON.stringify(brainData), function(err) {
						if (err) {
							//console.log(err);
						}
	});
	
	var confidenceInterval = 0;
	
	var file = fs.readFileSync(__dirname + "/net.json");
	var json = JSON.parse(file);
	net.fromJSON(json);

	function run() {
		var totalCorrect = 0;
		var totalGuesses = 0;
		var totalGuessed = 0;
		for (var i = 0; i < brainData.length; i++) {
			var guess = (net.run(brainData[i].input)[0] + (-(net.run(flipMatch(brainData[i]).input)[0]-0.5)+0.5))/2;
			var correctedGuess = Math.round(guess);
			//if (guess < 0.5-confidenceInterval || guess > 0.5+confidenceInterval) {
			if (Math.abs(guess-(0.5-confidenceInterval)) <= 0.01 || Math.abs(guess-(0.5+confidenceInterval)) <= 0.01) {
				totalGuessed++;
				if (correctedGuess == brainData[i].output) {
					totalCorrect++;
				}
				totalGuesses++;
			}
		}
		console.log(confidenceInterval + "," + Math.round(totalCorrect*10000/totalGuessed)/100);
		//console.log(confidenceInterval + "," + Math.round(totalGuessed*10000/brainData.length)/100);
	}
	
	for (var i = 0; i < 200; i++) {
		run();
		confidenceInterval += 0.002
	}
}

function exportNet() {
	var file = fs.readFileSync(__dirname + "/net.json");
	var json = JSON.parse(file);
	net.fromJSON(json);
	return net.toFunction();
}

function matchPrint(data) {
	var myText = "";
	for (var i = 0; i < data.input.length/2; i++) {
		if (data.input[i] == 1) {
			myText = myText + " " + (countToName(i));
		}
	}
	myText = myText + "\n vs \n";
	for (var i = data.input.length/2; i < data.input.length; i++) {
		if (data.input[i] == 1) {
			myText = myText + " " + (countToName(i-data.input.length/2));
		}
	}
	return(myText);
}

function formatMatches(matches, matchList) {
	var completeArray = [];
	for (var i = 0; i < matches.length; i++) {
		completeArray.push(formatMatch(matches[i]));
		//completeArray.push(flipMatch(formatMatch(matches[i])));
		if (i%2000 == 0) {
			var percent = Math.round(i*1000/matchList.length)/10;
			console.log(percent + "%");
		}
	}
	return completeArray;
}

function formatMatch(match) {
	var inputArray = [];
	for (var i = 0; i < numberOfChamps*2; i++) {
		inputArray[i] = 0;
	}
	for (var i = 0; i < 5; i++) {
		inputArray[idToCount(match.participants[i].championId)] = 1;
	}
	for (var i = 5; i < 10; i++) {
		inputArray[idToCount(match.participants[i].championId) + numberOfChamps] = 1;
	}
	
	var outputArray = []
	if (match.teams[0].win == "Win") {
		outputArray[0] = 1;
	} else {
		outputArray[0] = 0;
	}
	return {input: inputArray, output: outputArray};
}

function flipMatches(matches) {
	var flips = []
	for (var i = 0; i < matches.length; i++) {
		flips.push(flipMatch(matches[i]));
	}
	return flips;
}

function flipMatch(match) {
	var inputArray = match.input.slice(match.input.length/2,match.input.length).concat(match.input.slice(0,match.input.length/2));
	var outputArray = [+!match.output[0]];
	return {input: inputArray, output: outputArray};
}

function readMatches(matchList, fileLoc) {
	var matches = [];
	for (var i = 0; i < matchList.length; i++) {
		var file = fs.readFileSync(__dirname + fileLoc + matchList[i]);
		var json = JSON.parse(file);
		//ranked only above gold
		//console.log(matchRank(json));
		//if (json.queueId == 420 && matchRank(json) > 1) {
		//	matches.push(json);
		//}
		matches.push(json);
		if (i%500 == 0) {
			var percent = Math.round(i*1000/matchList.length)/10;
			console.log(percent + "%");
		}
	}
	return matches;
}

function matchRank(match) {
	var rankTotal = 0;
	for (var i = 0; i < match.participants.length; i++) {
		rankTotal += rankScore(match.participants[i].highestAchievedSeasonTier);
	}
	return rankTotal/match.participants.length;
}

function rankScore(theRank) {
	if (theRank == "UNRANKED") {
		return 0;
	}
	if (theRank == "BRONZE") {
		return 1;
	}
	if (theRank == "SILVER") {
		return 2;
	}
	if (theRank == "GOLD") {
		return 3;
	}
	if (theRank == "PLATINUM") {
		return 4;
	}
	if (theRank == "DIAMOND") {
		return 5;
	}
	if (theRank == "MASTER") {
		return 6;
	}
	if (theRank == "CHALLENGER") {
		return 7;
	}
}


function fileList(dir) {
	return fs.readdirSync(__dirname + "/" + dir);
}


function trainingMsg() {
	iterationCount = iterationCount + config.callbackPeriod;
	console.log(iterationCount);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function processMatches(dir) {
	var fileList = fs.readdirSync(__dirname + "/" + dir);
	var processedFileList = fs.readdirSync(__dirname + "/" + dir + "Processed");
	var i = fileList.indexOf(processedFileList.pop());
	if (i == -1) {i = 0}
	for (i = i; i < fileList.length; i++) {
		//console.log(__dirname + "/" + dir + "/" + fileList[i]);
		var file = fs.readFileSync(__dirname + "/" + dir + "/" + fileList[i]);
		var json = JSON.parse(file);
		if (json.queueId == 420) {
			var match = formatMatch(json);
			console.log(__dirname + "/" + dir + "Processed" + "/" + fileList[i]);
			fs.writeFile(__dirname + "/" + dir + "Processed" + "/" + fileList[i], JSON.stringify(match), function(err) {
				if (err) {
					//console.log(err);
				}
			});
			await sleep(1);
		}
	}
}




//getMatchBatch(null,"/matches/");
//getMatchBatch(null,"/untrainedMatches/");
//getMatchBatch(null,"/newMatches/");
//processMatches("matches");
//processMatches("untrainedMatches");
//processMatches("newMatches");
//learn("newMatchesProcessed");
//test(0.04);
testMany();


//var testSet = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//var fn = eval(fs.readFileSync(__dirname + "/trainedBrain.js", "utf8"));
//console.log(fn(testSet));