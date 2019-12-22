'use strict';

const CatComboEffect = function ({ id, name, desc, boosts }) {

this.getId = function () {
  return id;
};

this.getName = function () {
  return name;
};

this.getDesc = function (value) {
  return desc.replace(/#/g, value);
};

this.getBoosts = function () {
  return boosts;
};

}; //CatComboEffect

export default CatComboEffect;