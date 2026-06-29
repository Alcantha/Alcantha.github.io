'use strict';

const ActiveEffect = function (effect) {

const listCatCombo = [];

this.getTitle = function () {
  // Total effect value
  const activeCatCombos = listCatCombo.filter(cc => cc.isActive());
  const totalValuesPerOnly = [{value: 0}];
  activeCatCombos
    .map(cc => cc.getOnly())
    .filter(ccOnly => ccOnly !== undefined)
    .forEach(ccOnly => {
      if (!totalValuesPerOnly.find(e => e.only === ccOnly)) {
        totalValuesPerOnly.push({value: 0, only: ccOnly});
      }
    });
  totalValuesPerOnly.forEach(e => {
    const onlyName = e.only;
    e.value = activeCatCombos
      .filter(cc => {
        const ccOnly = cc.getOnly();
        return ccOnly === undefined || ccOnly === onlyName;
      })
      .reduce((res, cc) => res + cc.getEffectValue(), 0);
  });
  const effectName = effect.getName();
  const titles = totalValuesPerOnly.map(e => {
    const effectDescValue = e.value > 0 ? effect.getDesc(e.value) : undefined;
    const effectDesc = effectDescValue ? ` (${effectDescValue})` : '';
    const onlyDesc = e.only ? ` - ${e.only}` : '';
    return `${effectName}${effectDesc}${onlyDesc}`;
  });
  return titles;
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