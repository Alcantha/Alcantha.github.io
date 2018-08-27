'use strict';

let ABILITY_TYPES = {
  pctg: {
    format: (value) => {
      return value + '%';
    },
  },
  assist: {
    format: (value, faction, type) => {
      return faction + ' (' + type + ': ' + value + '%)';
    },
  },
  time: {
    format: (value) => {
      return value + 's';
    }
  },
};

let UNIT_ABILITIES = {
  evade: {
    name: 'Evasion',
    type: ABILITY_TYPES.pctg
  },
  assist: {
    name: 'Assist',
    type: ABILITY_TYPES.assist
  },
};

let ATTACK_ABILITIES = {
  crit: {
    name: 'Critical',
    n: 'crit',
    type: ABILITY_TYPES.pctg
  },
  stun: {
    name: 'Stun',
    n: 'stun',
    type: ABILITY_TYPES.pctg
  },
  lowAtk: {
    name: 'Weaken',
    n: 'weaken',
    type: ABILITY_TYPES.pctg
  },
  lowSpeed: {
    name: 'Reduce Attack Speed',
    n: 'red speed',
    type: ABILITY_TYPES.time
  },
  kb: {
    name: 'Knock Back',
    n: 'KB',
    type: ABILITY_TYPES.pctg
  },
  seal: {
    name: 'Special Seal',
    n: 'seal',
    type: ABILITY_TYPES.pctg
  },
  poison: {
    name: 'Poison',
    n: 'poison',
    type: ABILITY_TYPES.pctg
  }
};
