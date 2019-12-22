'use strict';

const CatUnit = function ({ id, rarity, names, ignore }) {

this.getId = function () {
  return id;
};

this.getRarity = function () {
  return rarity;
};

this.getName = function (form) {
  return names[form];
};

this.isIgnored = function () {
  return ignore > 0;
};

this.hasForm = function (form) {
  return names[form] != null;
}

};

export default CatUnit;