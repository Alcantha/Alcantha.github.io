'use strict';

import * as bc from './bc.js';

import CatUnit from './CatUnit.js';
import CatComboEffect from './CatComboEffect.js';
import CatComboBoost from './CatComboBoost.js';
import CatCombo from './CatCombo.js';

// CatUnit
const createCatUnit = function ({ id, r, names, ignore }) {
  return new CatUnit({ id, rarity: r, names, ignore });
}

// CatComboEffect
const createEffect = function ({ id, name, desc, boosts }) {
  return new CatComboEffect({ id, name, desc, boosts });
};

// CatComboBoost
const createBoost = function ({ id, name }) {
  return new CatComboBoost({ id, name });
}

// CatCombo
const createCatCombo = function (data, id, bcData) {
  const name = data.name;
  const units = data.units.map(data => {
    return {
      unit: bcData.getCatUnit(data.id, true),
      f: data.f || bc.DEFAULT_FORM,
    };
  });

  const effect = bcData.getEffect(data.effect.id);
  const boost = bcData.getBoost(data.effect.boost);

  return new CatCombo({ id, name, units, effect, boost });
};

// BattleCatData
const BattleCatData = function () {

const CAT_UNITS_URL = 'cat-units.json';
const EFFECTS_URL = 'effects.json';
const CAT_COMBOS_URL = 'cat-combos.json';

const listCatUnit = [];
const listEffect = [];
const listBoost = [];

let listCatCombo = [];
let listCatComboType = {}

const catUnitNotFound = createCatUnit({
  id: bc.ID_NOT_FOUND,
  names: ['unamed','unamed','unamed'],
});

// Load data from URL
const loadData = function (url) {
  return window.fetch(url).then(resp => {
    if (!resp.ok) {
      return null;
    }
    return resp.json();
  });
};

this.loadAll = function () {
  return new Promise((resolve, reject) => {
    const promises = [];

    promises.push(loadData(CAT_UNITS_URL));
    promises.push(loadData(EFFECTS_URL));
    promises.push(loadData(CAT_COMBOS_URL));

    Promise.all(promises).then(values => {
      const listCatUnitData = values[0];
      const listEffectData = values[1];
      const listCatComboData = values[2];

      // Cat Unit
      listCatUnitData.forEach(data => {
        listCatUnit[data.id] = createCatUnit(data);
      });

      // Effects
      listEffectData.effects.forEach(data => {
        listEffect[data.id] = createEffect(data);
      });

      // Boosts
      listEffectData.boosts.forEach(data => {
        listBoost[data.id] = createBoost(data);
      });

      // CatCombo (All)
      listCatCombo = listCatComboData
      .map((data, id) => createCatCombo(data, id, this));

      listCatComboType.all = [];
      listCatComboType.skills = [];
      listCatComboType.effects = [];
      listCatComboType.cannons = [];
      listCatComboType.moneys = [];
      listCatComboType.others = [];

      listCatCombo
      .map(cc => {
        const effectId = cc.getEffect().getId();

        switch (effectId) {
        case 1: // Attack
        case 2: // Defense
        case 3: // Speed
          // Skill
          listCatComboType.skills.push(cc);
          break;
        case 14: // Strong
        case 15: // Massive damage
        case 16: // Resistant
        case 17: // KB
        case 18: // Slow
        case 19: // Freeze
        case 20: // Weaken
        case 21: // Strengthen
        case 22: // Critical
        case 23: // Witch Killer
        case 24: // Eva Angel Killer
          // Effect
          listCatComboType.effects.push(cc);
          break;
        case 4: // Cannon start
        case 5: // Cannon power
        case 6: // Cannon recharge
        case 7: // Base defense
          // Cannon / Base
          listCatComboType.cannons.push(cc);
          break;
        case 8: // Money start
        case 9: // Worker start
        case 10: // Worker max
          // Money / Worker
          listCatComboType.moneys.push(cc);
          break;
        case 11: // Research
        case 12: // Accounting
        case 13: // Study
          listCatComboType.others.push(cc);
          break;
        }

        listCatComboType.all.push(cc);
      });

      const catComboAllSort = function (ccA, ccB) {
        const aNbCat = ccA.getUnits().length;
        const bNbCat = ccB.getUnits().length;
        const diffNbCat = aNbCat - bNbCat;

        if (diffNbCat !== 0) return diffNbCat;

        const aId = ccA.getId();
        const bId = ccB.getId();

        return aId - bId;
      };

      const catComboSort = function (ccA, ccB) {
        const aEId = ccA.getEffect().getId();
        const bEId = ccB.getEffect().getId();
        const diffEId = aEId - bEId;

        if (diffEId !== 0) return diffEId;

        const aBId = ccA.getBoost().getId();
        const bBId = ccB.getBoost().getId();
        const diffBId = aBId - bBId;

        if (diffBId !== 0) return diffBId;

        const aId = ccA.getId();
        const bId = ccB.getId();

        return aId - bId;
      };

      listCatComboType.all.sort(catComboAllSort);
      listCatComboType.skills.sort(catComboSort);
      listCatComboType.effects.sort(catComboSort);
      listCatComboType.cannons.sort(catComboSort);
      listCatComboType.moneys.sort(catComboSort);
      listCatComboType.others.sort(catComboSort);

      resolve();

    }).catch(reject);
  });
};

// Cat Unit
this.getListCatUnit = function () {
  return listCatUnit;
};

this.getCatUnit = function (index, always = false) {
  const catUnit = listCatUnit[index];

  if (catUnit == null && always) {
    return catUnitNotFound;
  }

  return catUnit;
};

// Effect
this.getEffect = function (id) {
  return listEffect[id];
};

// Boost
this.getBoost = function (id) {
  return listBoost[id || bc.DEFAULT_BOOST];
}

// Cat Combo
this.getListCatCombo = function () {
  return listCatCombo;
};

// Cat Combo
this.getListCatComboPerType = function (type) {
  return listCatComboType[type];
};

this.getCatCombo = function (index) {
  return listCatCombo[index];
};

}; // BattleCatData

export default BattleCatData;