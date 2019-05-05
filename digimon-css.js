'use strict';

const fs = require('fs');

const digimonsExist = fs.existsSync('./digimons.json');
const movesExist = fs.existsSync('./moves.json');
const typesExist = fs.existsSync('./typechart.json');

if (!digimonsExist || !movesExist || !typesExist) return console.log('RUN `node index.js` to create the required files first!');

const digimons = JSON.parse(fs.readFileSync('./digimons.json', 'utf8'));
const moves = JSON.parse(fs.readFileSync('./moves.json', 'utf8'));
const types = JSON.parse(fs.readFileSync('./typechart.json', 'utf8'));

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
    width: auto;
    height: auto;
}

.innerbattle div > img[src*="bw-back/${digi.id}"] {
    content: url("https://play.pokemonshowdown.com/sprites/digimon/sprites/digimonani-back/${digi.id}.gif");
    width: auto;
    height: auto;
}

.innerbattle .picon[aria-label*="${digi.id}"],
button[value*="${digi.name ? digi.name : digi.species}"] .picon {
	content: url("https://res.cloudinary.com/dragotic/image/upload/v1556978199/${digi.id}.png");
	width: auto;
	height: auto;
	margin: 5px;
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
.movemenu button[data-move="${moveObj.name}"] .type:after {
    font-size: 0.7em;
    font-weight: bold;
    content: "(${moveObj.type})";
}`;
    }

    CSS += `
.movemenu button[data-move="${moveObj.name}"]:after {
    white-space: pre;
    font-size: 0.7em;
    content: "\A ${moveObj.desc}";
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
