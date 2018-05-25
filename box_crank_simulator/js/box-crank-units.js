'use strict';

var units = [];

function initListUnit() {
  // Rarity
  // - 1: normal
  // - 2: rare
  // - 3: super rare

  // Type (when rarity is "super rare")
  // - 1: initial, pre-acq
  // - 2: box

  units[2] = { name: 'Marco', rarity: 1 };
  units[3] = { name: 'Tarma', rarity: 1 };
  units[5] = { name: 'Eri', rarity: 1 };
  units[6] = { name: 'Fio', rarity: 1 };
  units[7] = { name: 'Rebel Infantry', rarity: 1 };
  units[8] = { name: 'Shielded Soldier', rarity: 1 };
  units[9] = { name: 'Bazooka Soldier', rarity: 1 };
  units[11] = { name: 'Hyakutaro', rarity: 1 };
  units[12] = { name: 'Slugnoid', rarity: 1 };
  units[13] = { name: 'Utan', rarity: 1 };
  units[14] = { name: 'Di-Cokka', rarity: 1 };
  units[16] = { name: 'M-15A Bradley', rarity: 1 };
  units[17] = { name: 'Mars People', rarity: 1 };
  units[18] = { name: 'Hopper Mecha', rarity: 1 };
  units[19] = { name: 'Sasquatch', rarity: 1 };
  units[20] = { name: 'Mummy', rarity: 1 };
  units[23] = { name: 'Bat', rarity: 1 };
  units[24] = { name: 'Bazooka Guerrilla', rarity: 1 };
  units[31] = { name: 'Chowmein-Conga', rarity: 1 };
  units[38] = { name: 'Di-Cokka Ver. P.M.', rarity: 1 };
  units[39] = { name: 'Dog Mummy', rarity: 1 };
  units[40] = { name: 'Donald Morden', rarity: 3, type: 1 };
  units[43] = { name: 'Flying Killers', rarity: 1 };
  units[44] = { name: 'Gatling Soldier', rarity: 1 };
  units[46] = { name: 'Girida-O', rarity: 1 };
  units[47] = { name: 'Girida-O Ver. P.M.', rarity: 1 };
  units[48] = { name: 'Guerrilla', rarity: 1 };
  units[49] = { name: 'Guerrilla Mortar', rarity: 1 };
  units[51] = { name: 'Hi-Do', rarity: 3, type: 1 };
  units[52] = { name: 'Hover Units', rarity: 1 };
  units[53] = { name: 'Huge Locust', rarity: 1 };
  units[54] = { name: 'Hunged Mummy', rarity: 1 };
  units[55] = { name: 'Hunter Walker', rarity: 1 };
  units[56] = { name: 'Invader', rarity: 1 };
  units[57] = { name: 'Iron Iso', rarity: 1 };
  units[60] = { name: 'Karn', rarity: 3, type: 1 };
  units[61] = { name: 'Maggot', rarity: 1 };
  units[62] = { name: 'Man Eater', rarity: 1 };
  units[66] = { name: 'Mini U.F.O.', rarity: 1 };
  units[68] = { name: 'Mortar', rarity: 1 };
  units[70] = { name: 'Nadia', rarity: 1 };
  units[71] = { name: 'Native', rarity: 1 };
  units[79] = { name: 'Samurai Infantry', rarity: 1 };
  units[80] = { name: 'Samurai Plane', rarity: 1 };
  units[81] = { name: 'Samurai Tanks', rarity: 1 };
  units[83] = { name: 'Scientist (Zombie)', rarity: 1 };
  units[84] = { name: 'Shielded Guerrilla', rarity: 1 };
  units[85] = { name: 'Shoe', rarity: 3, type: 1 };
  units[88] = { name: 'Slug Gunner', rarity: 3, type: 1 };
  units[90] = { name: 'Sniper', rarity: 1 };
  units[91] = { name: 'Special Force', rarity: 1 };
  units[92] = { name: 'Special Force (Rider)', rarity: 1 };
  units[96] = { name: 'Trevor', rarity: 1 };
  units[98] = { name: 'Zombie (Fattish Man)', rarity: 1 };
  units[99] = { name: 'Zombie (Man)', rarity: 1 };
  units[100] = { name: 'Zombie (Rebel Soldier)', rarity: 1 };
  units[101] = { name: 'Zombie (Woman)', rarity: 1 };
  units[102] = { name: 'SV-Camel', rarity: 1 };
  units[103] = { name: 'Hairbuster Riberts', rarity: 3, type: 1 };
  units[106] = { name: 'Mecha Allen', rarity: 3, type: 1 };
  units[108] = { name: 'Bikers', rarity: 1 };
  units[110] = { name: 'Paratrooper', rarity: 1 };
  units[113] = { name: 'Zombie Marco', rarity: 3, type: 1 };
  units[118] = { name: 'MH-6 s', rarity: 1 };
  units[124] = { name: 'Ostrich Slug', rarity: 1 };
  units[132] = { name: 'Chariot', rarity: 1 };
  units[137] = { name: 'Slug Gigant', rarity: 3, type: 1 };
  units[149] = { name: 'Morden Robot', rarity: 3, type: 1 };
  units[156] = { name: 'Arabian Soldier', rarity: 1 };
  units[158] = { name: 'Camel Rider', rarity: 2 };
  units[163] = { name: 'R-Shobu Ver. F.', rarity: 2 };
  units[168] = { name: 'Amadeus Robot', rarity: 1 };
  units[182] = { name: 'Hazmat Soldier', rarity: 1 };
  units[189] = { name: 'Walter Rian', rarity: 2 };
  units[194] = { name: 'Native (Bird)', rarity: 1 };
  units[202] = { name: 'Halloween People', rarity: 2 };
  units[204] = { name: 'Vatn', rarity: 3, type: 1 };
  units[206] = { name: 'Whip', rarity: 3, type: 1 };
  units[209] = { name: 'Tyra Elson', rarity: 2 };
  units[216] = { name: 'Elite Hover Unit', rarity: 2 };
  units[217] = { name: 'Yoshino', rarity: 3, type: 1 };
  units[225] = { name: 'Heidern', rarity: 3, type: 1 };
  units[241] = { name: 'Caroline', rarity: 3, type: 1 };
  units[242] = { name: 'MH-6 s Ver. P.M.', rarity: 2 };
  units[252] = { name: 'Drill Slug Ver. 2', rarity: 2 };
  units[271] = { name: 'White Baby (Prototype)', rarity: 3, type: 2 };
  units[291] = { name: 'Jin', rarity: 3, type: 2 };
  units[299] = { name: 'Rumi Aikawa', rarity: 3, type: 2 };
  units[313] = { name: 'Veronica', rarity: 3, type: 2 };
  units[318] = { name: 'Navy', rarity: 3, type: 2 };
  units[337] = { name: 'Nova', rarity: 3, type: 2 };
  units[354] = { name: 'Esther', rarity: 3, type: 2 };
  units[373] = { name: 'Midori', rarity: 3, type: 2 };
}

// Type
// - 1: Box Crank
// - 2: Prev Box Crank
// - 3: Super Rare
// - 4: Rare
// - 5: Normal (3)
// - 6: Normal (2)
// - 7: Box Crank Return
var boxCrankListUnitId = [
  { type: 7, listUnitId: [373, 354, 337] },
  { type: 2, listUnitId: [318, 313, 299, 291, 271] },
  { type: 3, listUnitId: [241, 225, 217, 60, 113, 40, 88, 85, 149, 106, 51, 103, 137, 204, 206] },
  { type: 4, listUnitId: [252, 242, 216, 158, 163, 189, 202, 209] },
  { type: 5, listUnitId: [7, 14, 8] },
  { type: 6, listUnitId: [156] },
  { type: 5, listUnitId: [13] },
  { type: 6, listUnitId: [2, 3, 5, 6, 124, 102] },
  { type: 5, listUnitId: [12, 17, 11] },
  { type: 6, listUnitId: [16] },
  { type: 5, listUnitId: [31, 101, 18, 98, 100, 9, 44, 19, 99] },
  { type: 6, listUnitId: [46, 62] },
  { type: 5, listUnitId: [108] },
  { type: 6, listUnitId: [20, 39] },
  { type: 5, listUnitId: [57, 96, 70] },
  { type: 6, listUnitId: [79, 81, 80] },
  { type: 5, listUnitId: [61] },
  { type: 6, listUnitId: [66] },
  { type: 5, listUnitId: [52, 43, 48, 91] },
  { type: 6, listUnitId: [71] },
  { type: 5, listUnitId: [84, 24, 90, 83] },
  { type: 6, listUnitId: [47, 38] },
  { type: 5, listUnitId: [92, 118, 23, 54, 110, 68, 132] },
  { type: 6, listUnitId: [49] },
  { type: 5, listUnitId: [56] },
  { type: 6, listUnitId: [55] },
  { type: 5, listUnitId: [53] },
  { type: 6, listUnitId: [194, 168] },
  { type: 5, listUnitId: [182] },
];

initListUnit();