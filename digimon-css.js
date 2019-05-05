'use strict';

const fs = require('fs');
const CleanCSS = require('clean-css');

const digimonsExist = fs.existsSync('./digimons.json');
const movesExist = fs.existsSync('./moves.json');
const typesExist = fs.existsSync('./typechart.json');

if (!digimonsExist || !movesExist || !typesExist) return console.log('RUN `node index.js` to create the required files first!');

const digimons = JSON.parse(fs.readFileSync('./digimons.json', 'utf8'));
const moves = JSON.parse(fs.readFileSync('./moves.json', 'utf8'));
const types = JSON.parse(fs.readFileSync('./typechart.json', 'utf8'));

const typeImages = {
    'Air': 'https://cdn.discordapp.com/attachments/357714356915666954/476516530251890691/Air.png',
    'Aqua': 'https://cdn.discordapp.com/attachments/357714356915666954/476516531518570514/Aqua_Mini.png',
    'Battle': 'https://cdn.discordapp.com/attachments/357714356915666954/476516533489631233/Battle_Mini.png',
    'Evil': 'https://cdn.discordapp.com/attachments/357714356915666954/476516535398039562/Evil_Mini.png',
    'Filth': 'https://cdn.discordapp.com/attachments/357714356915666954/476516536895406100/Filth_Mini.png',
    'Flame': 'https://cdn.discordapp.com/attachments/357714356915666954/476516538866860043/Flame_Mini.png',
    'Holy': 'https://cdn.discordapp.com/attachments/357714356915666954/476516540829794304/Holy_Mini.png',
    'Mech': 'https://cdn.discordapp.com/attachments/357714356915666954/476516542780145666/Mech_Mini.png',
    'Nature': 'https://cdn.discordapp.com/attachments/357714356915666954/476516544126517268/Nature_Mini.png',    
};

let CSS = `
/************************
 * DIGIMON SHOWDOWN CSS *
 ************************/

div[id*="digimon"] .innerbattle .backdrop {
	background-image: url("https://sig.grumpybumpers.com/host/Dragotic.gif") !important;
}

div[id*="digimon"] .movemenu button {
	height: 60px;
	width: 45%;
	text-transform: capitalize;
}

div[id*="digimon"] button[name="chooseSwitch"],
div[id*="digimon"] button.disabled {
	width: 20%;
}
`;

CSS += `
/** DIGIMONS' SPRITES & ICONS CSS **/
`;

for (const digimon in digimons) {
    const digi = digimons[digimon];

    CSS += `
/** ${digi.species} CSS **/

.innerbattle div > img[src*="bw/${digi.id}"] {
    content: url("https://play.pokemonshowdown.com/sprites/digimon/sprites/digimonani/${digi.id}.gif");
    width: 56px !important;
    height: 56px !important;
}

.innerbattle div > img[src*="bw-back/${digi.id}"] {
    content: url("https://play.pokemonshowdown.com/sprites/digimon/sprites/digimonani-back/${digi.id}.gif");
    width: 56px !important;
    height: 56px !important;
}

.innerbattle .picon[aria-label*="(${digi.name ? digi.species.replace(/[^A-Za-z0-9]/g, "").replace(/\s/g, "") : digi.id})"],
.innerbattle .picon[aria-label^="${digi.species}"],
button[value*="${digi.name ? digi.name : digi.species}"] .picon {
	content: url("https://res.cloudinary.com/dragotic/image/upload/v1556978199/${digi.id}.png");
	width: auto;
	height: auto;
	margin: 3%;
}
`;
}

CSS += `
/** DIGIMON MOVES CSS **/
`;

for (const move in moves) {
    const moveObj = moves[move];

    CSS += `
/** ${moveObj.name} CSS **/
`;

    if (moveObj.type) {
        CSS += `
.movemenu button[data-move="${moveObj.name}"],
.movemenu button[data-move="${moveObj.name}"]:hover {
    background: #E3E3E3 url("${typeImages[moveObj.type]}") 1% 2% no-repeat;
}

.movemenu button[data-move="${moveObj.name}"] .type:after {
    font-weight: bold;
    content: "(${moveObj.type})";
}`;
    }

    CSS += `
.movemenu button[data-move="${moveObj.name}"]:after {
    white-space: pre;
    font-size: 0.7em;
    content: "${moveObj.desc}";
}
`;
}

CSS += `
/** DIGIMON TYPES CSS **/
`;

for (const type in types) {
    CSS += `
/** TYPE: ${type} CSS **/

img[src*="${type}.png"] {
	content: url("https://play.pokemonshowdown.com/sprites/digimon/sprites/types/${type}.png");
	width: auto;
	height: auto;
}
`;
}

fs.writeFileSync('./digimon.css', CSS, 'utf8');
console.log('Successfully wrote Digimon-Showdown-CSS!');

// Minified CSS
const CSSmin = new CleanCSS().minify(CSS).styles;

fs.writeFileSync('./digimon-min.css', CSSmin, 'utf8');
console.log('Minified Digimon-Showdown-CSS generated!');
