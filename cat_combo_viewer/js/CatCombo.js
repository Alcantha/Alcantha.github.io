'use strict';

// units <object array>
// - unit <CatUnit>     object | null
// - f <string>         '' | '0' | '1' | '2'

const CatCombo = function ({ id, name, units, effect, boost }) {

let active = true;

this.getId = function () {
  return id;
};

// Name

this.getName = function () {
  return name;
};

this.getActiveEffectName = function () {
  return `${name} (${boost.getName()})`;
};

// Units

this.getUnits = function () {
  return units;
};

/*
{
  show: true|false,
  active: true|false,
  units: [
    {
      present: null | '2' | 'v' | 'n',
    },
    ...
  ],
},
*/
this.checkUnits = function (listUnitDeck) {
  const listUnit = [];
  const show = this.hasAny(listUnitDeck);
  const active = this.hasAll(listUnitDeck.slice(0, 5));

  for (let i = 0; i < units.length; i++) {
    const present = checkPresent(units[i], listUnitDeck);

    listUnit.push({
      present,
    });
  }

  return {
    show,
    active,
    listUnit,
  };
};

this.hasAny = function (listUnitDeck) {
  return units.some(a => {
    return listUnitDeck.some(b => {
      return unitPresent(b, a);
    });
  });
};

this.hasAll = function (listUnitDeck) {
  return units.every(a => {
    return listUnitDeck.some(b => {
      return unitPresentAvailableForm(b, a);
    });
  });
};

const unitPresent = function (unitDeck, unitCc) {
  return unitDeck.unit === unitCc.unit;
};

const unitPresentAvailableForm = function (unitDeck, unitCc) {
  return unitDeck.unit === unitCc.unit && unitDeck.f >= unitCc.f;
};

const unitPresentLowerForm = function (unitDeck, unitCc) {
  return unitDeck.unit === unitCc.unit && unitDeck.f < unitCc.f;
};

/* present: null | '2' | 'v' | 'n', */
const checkPresent = function (obj, listUnitDeck) {
  const checkUnitCc = function (unitDeck) {
    return unitPresentAvailableForm(unitDeck, obj);
  };

  // Present in the first row with the available form.
  const present = listUnitDeck.slice(0, 5).some(checkUnitCc);

  if (present) {
    return null;
  }
  
  // Present in the first row but with lower form.
  const presentLowerForm = listUnitDeck.some(unitDeck => {
    return unitPresentLowerForm(unitDeck, obj);
  });

  if (presentLowerForm) {
    return 'v';
  }

  // Present in the second row with the available form.
  const presentRow2 = listUnitDeck.slice(5, 10).some(checkUnitCc);

  if (presentRow2) {
    return '2';
  }

  // Not present or missing form but has a vacant place.
  const vacant = listUnitDeck.length < 10;

  if (vacant) {
    return 'v';
  }

  // Cannot be placed in the deck.
  return 'n';
};

// Effect

this.getEffect = function () {
  return effect;
};

this.getDescEffect = function () {
  const effectName = effect.getName();
  const boostName = boost.getName();

  return `${effectName} UP (${boostName})`;
};

this.getEffectValue = function () {
  return effect.getBoosts()[boost.getId() - 1];
};

// Boost

this.getBoost = function () {
  return boost;
};

// Active

this.isActive = function () {
  return active;
};

this.setActive = function (b) {
  active = b;
};

}; // CatCombo

export default CatCombo;