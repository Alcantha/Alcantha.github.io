'use strict';

var units = [];

var NBOX = 1; // New Box Crank
var PBOX = 2; // Previous Box Crank
var SRAR = 3; // Super Rare
var RAR1 = 4; // Rare (once)
var RARE = 5; // Rare

function initListUnit() {
  // Rarity
  // - 1: normal
  // - 2: rare
  // - 3: super rare

  // Type (when rarity is "super rare")
  // - 1: initial, pre-acq
  // - 2: box

  units[26] = { name: 'Big Snail', rarity: 2 };
  units[29] = { name: 'Bradley Ver. P.M.', rarity: 2 };
  units[36] = { name: 'Dai-Manji', rarity: 2 };
  units[45] = { name: 'Giant Caterpillar', rarity: 3, type: 1 };
  units[51] = { name: 'Hi-Do', rarity: 3, type: 1 };
  units[74] = { name: 'Ptolemaic Slug', rarity: 2 };
  units[87] = { name: 'Slug Flyer', rarity: 3, type: 1 };
  units[95] = { name: 'Tar Man', rarity: 2 };
  units[113] = { name: 'Zombie Marco', rarity: 3, type: 1 };
  units[114] = { name: 'Commander', rarity: 2 };
  units[123] = { name: 'Prototype Iron', rarity: 3, type: 1 };
  units[134] = { name: 'Mummy Warrior', rarity: 3, type: 1 };
  units[136] = { name: 'Scotia Amundsen', rarity: 3, type: 1 };
  units[149] = { name: 'Morden Robot', rarity: 3, type: 1 };
  units[157] = { name: 'Bull Drill', rarity: 3, type: 1 };
  units[163] = { name: 'R-Shobu Ver. F.', rarity: 2 };
  units[173] = { name: 'Gimlet', rarity: 2 };
  units[174] = { name: 'MS-Alice', rarity: 3, type: 1 };
  units[178] = { name: 'Cat Ears Leona', rarity: 3, type: 1 };
  units[179] = { name: 'Red Eye', rarity: 2 };
  units[188] = { name: 'Iron', rarity: 3, type: 1 };
  units[204] = { name: 'Vatn', rarity: 3, type: 1 };
  units[206] = { name: 'Whip', rarity: 3, type: 1 };
  units[210] = { name: 'Allen O\'Neil (Wrath)', rarity: 3, type: 1 };
  units[216] = { name: 'Elite Hover Unit', rarity: 2 };
  units[217] = { name: 'Yoshino', rarity: 3, type: 1 };
  units[220] = { name: 'Golden Hunter Walker', rarity: 2 };
  units[236] = { name: 'Bodyguard (Rebel Rifleman)', rarity: 2 };
  units[237] = { name: 'Bodyguard (Shielded Soldier)', rarity: 2 };
  units[252] = { name: 'Drill Slug Ver. 2', rarity: 2 };
  units[257] = { name: 'Cleopatra', rarity: 3, type: 1 };
  units[271] = { name: 'White Baby (Prototype)', rarity: 3, type: 2 };
  units[273] = { name: 'Pocket Marco', rarity: 2 };
  units[279] = { name: 'Lydia', rarity: 2 };
  units[280] = { name: 'Vanguard (Type-A)', rarity: 2 };
  units[282] = { name: 'Anna Wiese', rarity: 2 };
  units[287] = { name: 'Zombie Fio', rarity: 2 };
  units[291] = { name: 'Jin', rarity: 3, type: 2 };
  units[294] = { name: 'Roberto Nicola', rarity: 2 };
  units[295] = { name: 'Zombie Eri', rarity: 2 };
  units[299] = { name: 'Rumi Aikawa', rarity: 3, type: 2 };
  units[300] = { name: 'Special Trevor', rarity: 2 };
  units[312] = { name: 'Special Caroline', rarity: 2 };
  units[313] = { name: 'Veronica', rarity: 3, type: 2 };
  units[314] = { name: 'Super Devil Eri', rarity: 3, type: 1 };
  units[315] = { name: 'Zombie Nadia', rarity: 2 };
  units[318] = { name: 'Navy', rarity: 3, type: 2 };
  units[319] = { name: 'Special Beatriz', rarity: 2 };
  units[322] = { name: 'Madoka Aikawa', rarity: 3, type: 1 };
  units[323] = { name: 'Nathalie Neo', rarity: 2 };
  units[328] = { name: 'Aileen', rarity: 3, type: 2 };
  units[329] = { name: 'Special Amundsen', rarity: 2 };
  units[330] = { name: 'Alisa Stewart', rarity: 2 };
  units[331] = { name: 'Super Devil Marco', rarity: 3, type: 1 };
  units[337] = { name: 'Nova', rarity: 3, type: 2 };
  units[340] = { name: 'Clone Fio', rarity: 2 };
  units[364] = { name: 'Clone Abby', rarity: 3, type: 2 };
  units[381] = { name: 'Shizuka', rarity: 3, type: 2 };
  units[382] = { name: 'Special Abul Abbas', rarity: 2 };
  units[389] = { name: 'Special Vita', rarity: 2 };
  units[399] = { name: 'Aisha', rarity: 3, type: 2 };
  units[413] = { name: 'Halloween Percier', rarity: 2 };
  units[428] = { name: 'Special Sisilia', rarity: 2 };
  units[437] = { name: 'Christmas Midori', rarity: 2 };
  units[441] = { name: 'Christmas Annette', rarity: 2 };
  units[446] = { name: 'Christmas Nova', rarity: 2 };
  units[455] = { name: 'Special Navy', rarity: 2 };
  units[459] = { name: 'Special Marco', rarity: 2 };
  units[463] = { name: 'Special Roberto', rarity: 2 };
  units[469] = { name: 'Special Vatn', rarity: 2 };
  units[473] = { name: 'Special Professor', rarity: 2 };
  units[475] = { name: 'Special Fat Eri', rarity: 2 };
  units[482] = { name: 'Believer (Elite)', rarity: 2 };
  units[483] = { name: 'Believer (Master)', rarity: 2 };
  units[484] = { name: 'Believer (Soldier)', rarity: 2 };
  units[489] = { name: 'Special Fat Tarma', rarity: 2 };
  units[495] = { name: 'Special Nowan', rarity: 2 };
  units[497] = { name: 'Special Destrade', rarity: 2 };
  units[503] = { name: 'Special Aileen', rarity: 2 };
  units[507] = { name: 'Special Mira', rarity: 2 };
  units[511] = { name: 'Valerian Bear Bubu', rarity: 2 };
  units[512] = { name: 'Valerian Bear Rosa', rarity: 2 };
  units[513] = { name: 'Valerian Bear Viola', rarity: 2 };
  units[517] = { name: 'Special Odette', rarity: 2 };
  units[519] = { name: 'Special Huracan', rarity: 2 };
  units[554] = { name: 'Molly', rarity: 3, type: 2 };
}

var boxCrankListUnitId = [
  { type: NBOX, listUnitId: [554] },
  { type: PBOX, listUnitId: [399, 381, 364, 337] },
  { type: SRAR, listUnitId: [331] },
  { type: PBOX, listUnitId: [328] },
  { type: SRAR, listUnitId: [322] },
  { type: PBOX, listUnitId: [318] },
  { type: SRAR, listUnitId: [314] },
  { type: PBOX, listUnitId: [313, 299, 291, 271] },
  { type: SRAR, listUnitId: [257, 217, 113, 45, 87, 149, 51, 123, 134, 136, 157, 188, 174, 178, 210, 204, 206] },
  { type: RAR1, listUnitId: [519, 517, 513, 512, 511, 507, 503, 497, 495, 489, 483, 482, 484, 475, 473, 469, 463, 459, 455, 446, 441, 437, 428, 413] },
  { type: RARE, listUnitId: [389] },
  { type: RAR1, listUnitId: [382] },
  { type: RARE, listUnitId: [340, 330, 329, 323, 319, 315, 312, 300, 295, 294, 287, 282, 280, 279, 273, 252, 237, 236, 220, 216, 95, 26, 114, 74, 29, 36, 163, 173, 179] },
];

initListUnit();