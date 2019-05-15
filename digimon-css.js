'use strict';

const fs = require('fs');

try {
    require('clean-css');
} catch (e) {
    return console.log('RUN `npm install` to install the dependencies!');
}

const CleanCSS = require('clean-css');

const digimonsExist = fs.existsSync('./digimons.json');
const movesExist = fs.existsSync('./moves.json');
const typesExist = fs.existsSync('./typechart.json');

if (!digimonsExist || !movesExist || !typesExist) return console.log('RUN `node index.js` to create the required files first!');

const digimons = JSON.parse(fs.readFileSync('./digimons.json', 'utf8'));
const moves = JSON.parse(fs.readFileSync('./moves.json', 'utf8'));
const types = JSON.parse(fs.readFileSync('./typechart.json', 'utf8'));
const positions = JSON.parse(fs.readFileSync('./positions.json', 'utf8'));

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
    background-image: url('https://sig.grumpybumpers.com/host/Dragotic.gif') !important;
    background-position: 0 -20px;
}

div[id*="digimon"] .movemenu button {
    height: 60px;
    width: 48%;
    margin: 0.5%;
    overflow: hidden;
}

div[id*="digimon"] button[name="chooseSwitch"],
div[id*="digimon"] button.disabled {
    width: 15%;
    margin-right: 1.5%;
}

div[id*="digimon"] .teamicons .picon[aria-label="Not revealed"],
div[id*="digimon"] button[name="chooseSwitch"] .picon,
div[id*="digimon"] button[name="chooseTeamPreview"] .picon  {
    background: url('http://play.pokemonshowdown.com/sprites/digimon/sprites/xyicons-pokeball-sheet.png') !important;
}

div[id*="digimon"] .status img[src*="/sprites/types/"] {
    display: none;
}

div[id*="digimon"] .innerbattle div > img[style*="left: 111px; top: 173px;"] {
    left: 170px !important;
    top: 210px !important;
}

div[id*="digimon"] .innerbattle div > img[style*="left: 223px; top: 188px;"] {
    left: 278px !important;
    top: 225px !important;
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
    content: url('https://play.pokemonshowdown.com/sprites/digimon/sprites/digimonani/${digi.id}.gif');
    width: 56px !important;
    height: 56px !important;
}

.innerbattle div > img[src*="bw-back/${digi.id}"] {
    content: url('https://play.pokemonshowdown.com/sprites/digimon/sprites/digimonani-back/${digi.id}.gif');
    width: 56px !important;
    height: 56px !important;
}

.innerbattle .picon[aria-label*="${digi.specialName ? `(${digi.specialName})` : digi.species.replace(/\W/g, '').replace(/\s/g, '')}"],
.innerbattle .picon[aria-label^="${digi.id}"],
button[value*="${digi.name ? digi.name : digi.species}"] .picon {
    background: url('https://res.cloudinary.com/dragotic/image/upload/v1557211925/digimonicons-sheet.png') no-repeat scroll ${positions[digi.id].x}px ${positions[digi.id].y}px !important;
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
    background: #e3e3e3 url('${typeImages[moveObj.type]}') 1% 0.15em no-repeat;
}

.movemenu button[data-move="${moveObj.name}"] .type:after {
    font-weight: bold;
    content: "(${moveObj.type}) [${moveObj.category}]";
}
`;
    }

    CSS += `
div[id*="digimon"] .movemenu button[data-move="${moveObj.name}"]:after {
    font-size: 0.7em;
    content: "(${moveObj.desc})";
    padding: 0 5%;
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
    content: url('https://play.pokemonshowdown.com/sprites/digimon/sprites/types/${type}.png');
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
