'use strict';

const fs = require('fs');

// MOVES
const origMoveDex = require('./data/orig-moves').BattleMovedex;
const MoveDex = require('./data/moves').BattleMovedex;
const newMoveDex = {};

// FILTER MOVES
for (const move in MoveDex) {
    const currMove = MoveDex[move].name ? MoveDex[move] : origMoveDex[move];
    const onlyDesc = MoveDex[move].name ? false : true;
    const newObj = {
        id: currMove.id,
        name: currMove.name,
        desc: MoveDex[move].shortDesc,
    };
    if (!onlyDesc) {
        newObj.type = currMove.type;
        newObj.basePower = currMove.basePower;
        newObj.category = currMove.category;
        newObj.accuracy = typeof currMove.accuracy === 'boolean' ? '-' : currMove.accuracy;
    }

    newMoveDex[move] = newObj;
}

// DIGIDEX
const DigiDex = require('./data/pokedex').BattlePokedex;
const DigiSets = require('./data/digimon-sets').Sets;
const newDigiDex = {};

/** 
 * @param {string} spcies 
 */
const getSpecies = (species) => {
	switch (species) {
        case 'MeicrackmonViciousMode':
            return 'Meicrackmon [Vicious Mode]';
        case 'CherubimonEvil':
            return 'Cherubimon [Evil]';
        case 'CherubimonGood':
            return 'Cherubimon [Good]';
        case 'MetalGreymonVaccine':
            return 'MetalGreymon [Vaccine]';
        case 'MetalGreymonVirus':
            return 'MetalGreymon [Virus]';
        default:
            return species;
	}
};

// FILTER DIGIMONS
for (const digimon in DigiDex) {
    const currDigi = DigiDex[digimon];
    const digiName = DigiSets[currDigi.species].name;
    const hasName = digiName ? true : false;
    const newObj = {
        id: digimon,
        species: getSpecies(currDigi.species),
    };
    if (hasName) {
        newObj.name = digiName;
        newObj.specialName = DigiSets[currDigi.species].species;
    }

    newDigiDex[digimon] = newObj;
}

// TYPES
const origTypes = require('./data/orig-typechart').BattleTypeChart;
const DigiTypes = require('./data/typechart').BattleTypeChart;
const newTypeChart = {};

// FILTER TYPES
for (const type in DigiTypes) {
    const digiType = !origTypes[type] && DigiTypes[type];
    if (!digiType) continue;

    newTypeChart[type] = true;
}

// WRITE MOVES
fs.writeFileSync('./moves.json', JSON.stringify(newMoveDex, null, 4), 'utf8');
console.log('Digimon Moves has been written to moves.json');

// WRITE DIGIDEX
fs.writeFileSync('./digimons.json', JSON.stringify(newDigiDex, null, 4), 'utf8');
console.log('Digimons have been written to digimons.json');

// WRITE TYPECHART
fs.writeFileSync('./typechart.json', JSON.stringify(newTypeChart, null, 4), 'utf8');
console.log('Digimon Types have been written to typechart.json');
