'use strict';

const ActiveEffect = function (effect) {

const listCatCombo = [];

this.getTitle = function () {
  // Total effect value
  const total = listCatCombo
    .filter(cc => cc.isActive())
    .reduce((res, cc) => res + cc.getEffectValue(), 0);

  const effectName = effect.getName();

  if (total === 0) {
    return `${effectName}`;
  }

  const effectDesc = effect.getDesc(total);

  return `${effectName} (${effectDesc})`;
};

this.getEffectId = function () {
  return effect.getId();
};

this.getListCatCombo = function () {
  return listCatCombo;
};

this.addCatCombo = function (catCombo) {
  listCatCombo[catCombo.getId()] = catCombo;
};

this.removeCatCombo = function (catCombo) {
  delete listCatCombo[catCombo.getId()];
};

}; // ActiveEffect

export default ActiveEffect;